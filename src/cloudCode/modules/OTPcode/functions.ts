import OTPcode from '../../models/OTPcode';
import { generateRandomInteger } from '../../utils/generateRandom';

Parse.Cloud.define(
  'generateOTP',
  async request => {
    const {mobileNumber} = request.params;

    const otp = new OTPcode();
    otp.mobileNumber = mobileNumber;
    otp.OTP = generateRandomInteger(4);
    otp.save();

    // if (mobileNumber === '+971111111111') {
    //   return;
    // }
    // const dateNow = new Date().getTime();
    // const otp = generateRandomInteger(6);

    // const check_old_verificationCode = await new Parse.Query(OTPcode)
    //   .equalTo('mobileNumber', mobileNumber)
    //   .first({useMasterKey: true});

    // if (check_old_verificationCode) {
    //   const timeToResend =
    //     (check_old_verificationCode.createdAt.getTime() -
    //       dateNow +
    //       time_to_resend_otp_code_ms) /
    //     1000;

    //   if (
    //     dateNow - check_old_verificationCode.createdAt.getTime() <
    //     time_to_resend_otp_code_ms
    //   ) {
    //     throw {
    //       codeStatus: 1000,
    //       message: `Try again after ${Math.trunc(timeToResend)} seconds!.`,
    //     };
    //   } else {
    //     await check_old_verificationCode.destroy({useMasterKey: true});
    //   }
    // }

    // const verificationCode = new OTPcode();
    // verificationCode.mobileNumber = mobileNumber;
    // verificationCode.OTP = otp;

    // const acl = new Parse.ACL();
    // acl.setPublicReadAccess(false);
    // acl.setPublicWriteAccess(false);
    // verificationCode.setACL(acl);

    // await verificationCode.save(null, {useMasterKey: true});

    // return await pushOTPcodeViaSMS_syria(mobileNumber, otp);
  },
  {
    fields: {
      mobileNumber: {
        required: true,
        type: String,
      },
    },
  }
);


