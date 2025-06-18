import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateJWTFromRequest } from '@/lib/jwt-auth'

export const dynamic = 'force-dynamic'

export async function POST(request: Request, context: { params: Promise<{ requestId: string }> }) {
  console.log('🔍 [RESEND-EMAIL] Validating JWT token...');
  
  // Validate JWT token
  const admin = await validateJWTFromRequest(request)
  if (!admin) {
    console.log('🔍 [RESEND-EMAIL] JWT validation failed');
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  console.log('🔍 [RESEND-EMAIL] JWT valid for admin:', admin.username);
  
  const params = await context.params;
  const { requestId } = params;

  if (!requestId) {
    return NextResponse.json(
      { error: 'Request ID is required' },
      { status: 400 }
    );
  }

  try {
    const body = await request.json()
    const { isEnglish } = body

    // Get the CV request
    const cvRequest = await prisma.cVRequest.findUnique({
      where: { requestId },
      select: {
        name: true,
        email: true,
        status: true,
        isEnglish: true
      }
    })

    if (!cvRequest) {
      return NextResponse.json(
        { error: 'Request not found' },
        { status: 404 }
      )
    }

    if (cvRequest.status !== 'APPROVED') {
      return NextResponse.json(
        { error: 'Request must be approved to resend email' },
        { status: 400 }
      )
    }

    // Use the language preference from the request or fall back to stored value
    const useEnglish = isEnglish ?? cvRequest.isEnglish

    console.log('📧 [RESEND-EMAIL] Resending CV approval email to:', cvRequest.email);
    console.log('🔍 [RESEND-EMAIL] Language:', useEnglish ? 'English' : 'Norwegian');

    // Send the CV approval email
    try {
      const { sendCVApprovalEmail } = await import('@/app/lib/services/email');
      
      // Use language-specific CV URLs
      const cvUrl = useEnglish
        ? process.env.CV_URL_EN
        : process.env.CV_URL_NO;

      console.log('🔍 [RESEND-EMAIL] Using CV URL:', cvUrl);

      if (!cvUrl) {
        throw new Error(`CV URL not found in environment variables. CV_URL_EN: ${process.env.CV_URL_EN}, CV_URL_NO: ${process.env.CV_URL_NO}`);
      }

      if (cvUrl.includes('[your-cv-url')) {
        throw new Error(`CV URL contains placeholder value. CV_URL_EN: "${process.env.CV_URL_EN}", CV_URL_NO: "${process.env.CV_URL_NO}". Please update environment variables with actual CV URLs.`);
      }

      await sendCVApprovalEmail({
        name: cvRequest.name,
        email: cvRequest.email,
        cvUrl,
        isEnglish: useEnglish
      });

      console.log('✅ [RESEND-EMAIL] Email resent successfully');

      // Log the resend action
      await prisma.systemLog.create({
        data: {
          level: 'info',
          message: 'CV approval email resent',
          details: `Request ID: ${requestId}, Email: ${cvRequest.email}, Language: ${useEnglish ? 'English' : 'Norwegian'}`,
          source: 'cv-resend-email'
        }
      });

      return NextResponse.json({ 
        message: 'CV approval email resent successfully' 
      });

    } catch (error) {
      console.error('❌ [RESEND-EMAIL] Failed to send email:', error);
      
      // Log the error to database
      await prisma.systemLog.create({
        data: {
          level: 'error',
          message: 'Failed to resend CV approval email',
          details: error instanceof Error ? error.message : 'Unknown error',
          source: 'cv-resend-email'
        }
      });

      return NextResponse.json(
        { error: error instanceof Error ? error.message : 'Failed to send email' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error resending CV email:', error)

    // Log the error
    await prisma.systemLog.create({
      data: {
        level: 'error',
        message: 'Failed to resend CV email',
        details: error instanceof Error ? error.message : 'Unknown error',
        source: 'cv-resend-email'
      }
    })

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

