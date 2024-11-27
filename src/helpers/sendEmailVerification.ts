import resend from '@/lib/resend';
import { ApiResponce } from '@/types/apiResponce';
import VerificationEmail from '../../Emails/VerificationEmail';

export async function sendEmailVerification(
    email:string,
    username:string,
    verifyCode:string,
):Promise<ApiResponce> {
    try {
        await resend.emails.send({
            from: 'you@example.com',
            to: email,
            subject: 'Mystry message | Verification Coden',
            react: VerificationEmail({username,otp:verifyCode}),
          });
        return{
            success:true,message:'Verification code send Successfully'
        } 
    } catch (emailerror) {
        console.error('Error send the code',emailerror)
        return{
            success:false,message:'Failed to send email verification code'
        }
    }
}

