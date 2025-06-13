
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface OTPEmailRequest {
  email: string;
  otp: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, otp }: OTPEmailRequest = await req.json();

    const emailResponse = await resend.emails.send({
      from: "AI Sentinel <onboarding@resend.dev>",
      to: [email],
      subject: "Your AI Sentinel Verification Code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #60a5fa; margin: 0; font-size: 28px;">🛡️ AI Sentinel</h1>
            <p style="color: #cbd5e1; margin: 10px 0;">Mobile Cyber Protection</p>
          </div>
          
          <div style="background: rgba(255, 255, 255, 0.1); padding: 25px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <h2 style="color: #f1f5f9; margin: 0 0 15px 0;">Your Verification Code</h2>
            <div style="font-size: 36px; font-weight: bold; color: #60a5fa; letter-spacing: 8px; margin: 20px 0; font-family: 'Courier New', monospace;">
              ${otp}
            </div>
            <p style="color: #cbd5e1; margin: 15px 0; font-size: 14px;">
              This code will expire in 10 minutes for your security.
            </p>
          </div>
          
          <div style="background: rgba(239, 68, 68, 0.1); border-left: 4px solid #ef4444; padding: 15px; margin: 20px 0; border-radius: 4px;">
            <p style="color: #fecaca; margin: 0; font-size: 14px;">
              <strong>Security Notice:</strong> Never share this code with anyone. AI Sentinel will never ask for your verification code via phone or email.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.2);">
            <p style="color: #94a3b8; font-size: 12px; margin: 0;">
              If you didn't request this code, please ignore this email.
            </p>
            <p style="color: #94a3b8; font-size: 12px; margin: 5px 0 0 0;">
              © ${new Date().getFullYear()} AI Sentinel - Advanced Mobile Security
            </p>
          </div>
        </div>
      `,
    });

    console.log("OTP email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-otp function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
