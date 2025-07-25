import dbConnect from "@/lib/dbConnect";
import UserModal from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { success } from "zod";

export async function POST(request: Request){
  await dbConnect()
  try{
    const {username, email, password} = await request.json()
    const existingUserVerifiedByUsername = await UserModal.findOne({
      username,
      isVerified: true
    })
    const existingUserByEmail = await UserModal.findOne({email})
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()

    // Checking Username already taken or not
    if (existingUserVerifiedByUsername) {
      return Response.json({
        success: false,
        message: 'Username already taken'
      },{
        status:400
      })
    }

    // Checking email already exist or not
    if(existingUserByEmail){
      if(existingUserByEmail.isVerified){
        return Response.json({
          success: false,
          message: 'User already exist with this email'
        },{status: 400})
      } else{
        const hasedPassword = await bcrypt.hash(password, 10)
        existingUserByEmail.password = hasedPassword;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
        await existingUserByEmail.save()
      }
    } else {
      const hasedPassword = await bcrypt.hash(password, 10)
      const expiryDate = new Date()
      expiryDate.setHours(expiryDate.getHours() + 1)
      const newUser = await new UserModal({
        username,
        email,
        password: hasedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessage: true,
        messages: []
      })
      await newUser.save()
    }

    
    // send verification email
    const emailResponse = await sendVerificationEmail(
      email, 
      username,
      verifyCode
    )

    if (!emailResponse.success){
      return Response.json({
        success: false,
        message: emailResponse.message
      },{status:500})
    }
    return Response.json({
        success: true,
        message: 'User registered successfuly. Please verify your email.'
      },{status:201})

  } catch(error) {
    console.error('Error registering user',error)
    return Response.json({
      success: false,
      error:'Error registering user'
    },{
      status:500
    })
  }
}