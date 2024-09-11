// import Deliveryman from '../../models/Deliveryman';
// import DeliverymanCurrentLocation from '../../models/DeliverymanCurrentLocation';
// import Image from '../../models/Image';
// import OnlineStatus from '../../models/OnlineStatus';
// import Restaurant from '../../models/Restaurant';
// import User from '../../models/User';
// import {
//   Client_Role,
//   Deliveryman_Role,
//   Foodify_Content_Manager_Role,
//   Foodify_Manager_Role,
//   Foodify_Role,
//   Restaurant_Role,
// } from '../../utils/FoodifyRoles';
// import {generateRandomInteger} from '../../utils/generateRandom';
// import {subscribeToTopic, unsubscribeFromTopic} from '../../utils/manageTopics';
// import {mapImageObject} from '../../utils/mapImageObject';
// import {getRestaurantsOrders} from '../Restaurant/functions';

import Doctor from "../../models/Doctor";

// Parse.Cloud.define(
//   'updateClientInfo',
//   async request => {
//     const {fullName, email, birthdate, gender, image_base64} = request.params;

//     const user = request.user as User;
//     const sessionToken = user?.getSessionToken();

//     if (fullName) {
//       user.fullName = fullName;
//     }
//     if (gender) {
//       user.gender = gender;
//     }

//     if (image_base64) {
//       const image = new Image();
//       image.image = new Parse.File('image.webp', {
//         base64: image_base64,
//       });
//       user.image = await image.save(null, {sessionToken: sessionToken});
//     }
//     if (birthdate) {
//       user.birthdate = new Date(birthdate);
//     }
//     if (email) {
//       user.setEmail(email);
//     }

//     let savedUser = await user.save(null, {sessionToken: sessionToken});

//     savedUser = await savedUser.fetchWithInclude(['image', 'userBlock'], {
//       sessionToken: sessionToken,
//     });
//     return {
//       id: savedUser?.id,
//       email: savedUser?.getEmail(),
//       fullName: savedUser?.fullName,
//       mobileNumber: savedUser?.mobileNumber,
//       gender: savedUser?.gender,
//       birthdate: savedUser?.birthdate,
//       image: mapImageObject(savedUser?.image!),
//       userBlock: {
//         id: savedUser?.userBlock?.id,
//         classname: savedUser?.userBlock?.className,
//         isUserBlocked: savedUser?.userBlock?.isUserBlocked,
//       },
//     };
//   },
//   {
//     requireUser: true,
//     requireAnyUserRoles: [Client_Role, Deliveryman_Role],
//     fields: {
//       fullName: {
//         required: false,
//         type: String,
//       },
//       countryName: {
//         required: false,
//         type: String,
//       },
//       email: {
//         required: false,
//         type: String,
//       },
//       birthdate: {
//         required: false,
//         type: String,
//       },
//       gender: {
//         required: false,
//         type: String,
//         options: (val: string) => {
//           if (!(val === 'male' || val === 'female')) {
//             throw 'male or female allowed.';
//           }
//         },
//       },
//       image_base64: {
//         required: false,
//         type: String,
//       },
//     },
//   }
// );

// Parse.Cloud.define(
//   'getMyProfile',
//   async request => {
//     const user = request.user as User;
//     const sessionToken = user.getSessionToken();

//     const userProfile = await new Parse.Query(User)
//       .equalTo('objectId', user.id)
//       .include(['image', 'userBlock'])
//       .first({sessionToken: sessionToken});

//     return {
//       id: userProfile?.id,
//       classname: userProfile?.className,
//       email: userProfile?.getEmail(),
//       fullName: userProfile?.fullName,
//       mobileNumber: userProfile?.mobileNumber,
//       gender: userProfile?.gender,
//       birthdate: userProfile?.birthdate,
//       image: mapImageObject(userProfile?.image!),
//       userBlock: {
//         id: userProfile?.userBlock?.id,
//         classname: userProfile?.userBlock?.className,
//         isUserBlocked: userProfile?.userBlock?.isUserBlocked,
//       },
//     };
//   },
//   {
//     requireUser: true,
//   }
// );

// Parse.Cloud.define(
//   'updateFcmToken',
//   async request => {
//     const user = request.user as User;
//     const sessionToken = user?.getSessionToken();
//     const {fcm_token} = request.params;

//     user.fcm_token = fcm_token;
//     user.fcm_token_updatedAt = new Date();

//     const checkRole = await new Parse.Query(Parse.Role)
//       .equalTo('users', user)
//       .first({useMasterKey: true});

//     if (checkRole) {
//       const roleName = checkRole.getName();
//       subscribeToTopic(roleName, [fcm_token]);
//     }

//     try {
//       await user.save(null, {sessionToken: sessionToken});
//     } catch (error) {
//       throw 'Unable to set FCM token';
//     }
//     return;
//   },
//   {
//     requireUser: true,
//     fields: {
//       fcm_token: {
//         required: true,
//         type: String,
//       },
//     },
//   }
// );

// Parse.Cloud.define(
//   'updateUserLang',
//   async request => {
//     const user = request.user as User;
//     const sessionToken = user?.getSessionToken();

//     user.lang = (request as any)?.headers?.lang ?? 'en';

//     try {
//       await user.save(null, {sessionToken: sessionToken});
//     } catch (error) {
//       throw 'Unable to set user lang';
//     }
//     return;
//   },
//   {
//     requireUser: true,
//   }
// );

// Parse.Cloud.define(
//   'deleteAccount',
//   async request => {
//     const user: User = (await request.user?.fetch({
//       useMasterKey: true,
//     })) as User;
//     unsubscribeFromTopic('User', [user.fcm_token]);

//     const finalUsername = `Deleted Account/ ${user?.getUsername()}/ ${user?.id}`;
//     const finalFullName = `Deleted Account`;
//     const mobileNumber = `+000000000000`;

//     user.setUsername(finalUsername);
//     user.unset('email');
//     user.unset('fcm_token');
//     user.fullName = finalFullName;
//     user.mobileNumber = mobileNumber;
//     user.authData = {
//       continueWithMobileAuth: {
//         id: finalUsername,
//         OTP: '000000',
//       },
//     };
//     user.setPassword(generateRandomInteger(15));
//     user.deleted = true;

//     const acl = user.getACL()!;
//     acl?.setReadAccess(user, false);
//     acl?.setWriteAccess(user, false);
//     user.setACL(acl);
//     user.save(null, {useMasterKey: true});

//     const sessions = await new Parse.Query(Parse.Session)
//       .equalTo('user', user)
//       .find({
//         useMasterKey: true,
//       });
//     Parse.Object.destroyAll(sessions, {useMasterKey: true});
//   },
//   {
//     requireUser: true,
//     requireAnyUserRoles: ['User'],
//   }
// );

// Parse.Cloud.define(
//   'addEditRestaurantUser',
//   async request => {
//     const {
//       objectId,
//       username,
//       password,
//       restaurant_id,
//       fullName,
//       gender,
//       mobileNumber,
//     } = request.params;

//     const user = request.user as User;
//     const sessionToken = user?.getSessionToken();
//     const [shared_Restaurant_Role, single_Restaurant] = await Promise.all([
//       new Parse.Query(Parse.Role)
//         .equalTo('name', 'Restaurant')
//         .first({useMasterKey: true}),
//       new Parse.Query(Restaurant)
//         .equalTo('objectId', restaurant_id)
//         .first({useMasterKey: true}),
//     ]);

//     if (!shared_Restaurant_Role) {
//       throw 'Restaurant role is not set.';
//     }
//     if (!single_Restaurant) {
//       throw 'Invalid restaurant.';
//     }
//     const single_Restaurant_Role = await new Parse.Query(Parse.Role)
//       .endsWith('name', single_Restaurant.roleSuffix)
//       .first({useMasterKey: true});
//     if (!single_Restaurant_Role) {
//       throw 'Custom restaurant role is not set.';
//     }
//     const single_Restaurant_Manager_Role = await new Parse.Query(Parse.Role)
//       .endsWith('name', `${single_Restaurant.roleSuffix}_Manager`)
//       .first({useMasterKey: true});
//     if (!single_Restaurant_Manager_Role) {
//       throw 'Restaurant manager role is not set.';
//     }
//     const _user = new User();
//     _user.id = objectId;
//     _user.setUsername(username);
//     _user.setPassword(password);
//     _user.fullName = fullName;
//     _user.mobileNumber = mobileNumber;
//     _user.gender = gender;

//     if (!objectId) {
//       const saveduser = await _user.save(null, {
//         useMasterKey: true,
//         context: {
//           RestaurantUser: true,
//           single_Restaurant_Manager_Role:
//             single_Restaurant_Manager_Role.getName(),
//         },
//       });

//       shared_Restaurant_Role.getUsers().add(saveduser);
//       await shared_Restaurant_Role.save(null, {useMasterKey: true});

//       single_Restaurant_Role.getUsers().add(saveduser);
//       await single_Restaurant_Role.save(null, {useMasterKey: true});

//       return saveduser;
//     }

//     return _user.save(null, {
//       useMasterKey: true,
//     });
//   },
//   {
//     requireUser: true,
//     requireAnyUserRoles: [Foodify_Manager_Role, Restaurant_Role],
//     fields: {
//       objectId: {
//         required: false,
//         type: String,
//       },
//       username: {
//         required: true,
//         type: String,
//       },
//       password: {
//         required: false,
//         type: String,
//       },
//       restaurant_id: {
//         required: true,
//         type: String,
//       },
//       mobileNumber: {
//         required: true,
//         type: String,
//       },
//       fullName: {
//         required: true,
//         type: String,
//       },
//       gender: {
//         required: true,
//         type: String,
//       },
//     },
//   }
// );

// Parse.Cloud.define(
//   'addEditFoodifyUser',
//   async request => {
//     const {objectId, username, password, mobileNumber, gender, fullName} =
//       request.params;

//     const user = request.user as User;
//     const sessionToken = user?.getSessionToken();

//     const [shared_Foodify_Role] = await Promise.all([
//       new Parse.Query(Parse.Role)
//         .equalTo('name', 'Foodify')
//         .first({useMasterKey: true}),
//     ]);

//     if (!shared_Foodify_Role) {
//       throw 'shared_Foodify_Role role is not set.';
//     }

//     const _user = new User();
//     _user.id = objectId;
//     _user.setUsername(username);
//     _user.setPassword(password);
//     _user.mobileNumber = mobileNumber;
//     _user.gender = gender;
//     _user.fullName = fullName;
//     const saveduser = await _user.save(null, {
//       useMasterKey: true,
//       context: {
//         FoodifyUser: true,
//       },
//     });
//     if (!objectId) {
//       shared_Foodify_Role.getUsers().add(saveduser);
//       await shared_Foodify_Role.save(null, {useMasterKey: true});

//       shared_Foodify_Role.getUsers().add(saveduser);
//       await shared_Foodify_Role.save(null, {useMasterKey: true});
//     }

//     return saveduser;
//   },
//   {
//     requireUser: true,
//     requireAnyUserRoles: [Foodify_Manager_Role],
//     fields: {
//       objectId: {
//         required: false,
//         type: String,
//       },
//       fullName: {
//         required: false,
//         type: String,
//       },
//       gender: {
//         required: false,
//         type: String,
//       },
//       mobileNumber: {
//         required: true,
//         type: false,
//       },
//       username: {
//         required: true,
//         type: String,
//       },
//       password: {
//         required: false,
//         type: String,
//       },
//     },
//   }
// );

// Parse.Cloud.define(
//   'changeUserPassword',
//   async request => {
//     const {userId, password} = request.params;

//     const user = request.user as User;
//     const sessionToken = user?.getSessionToken();

//     const editableUser = new User();
//     editableUser.id = userId;
//     editableUser.setPassword(password);

//     await editableUser.save(null, {
//       sessionToken: sessionToken,
//     });
//   },
//   {
//     requireUser: true,
//     fields: {
//       userId: {
//         required: true,
//         type: String,
//       },
//       password: {
//         required: true,
//         type: String,
//       },
//     },
//   }
// );

// Parse.Cloud.define(
//   'updateClientMobileNumber',
//   async request => {
//     const {userId, mobileNumber, otp} = request.params;
//     const user = request.user as User;
//     const sessionToken = user?.getSessionToken();
//     let clinet = new User();
//     clinet.id = userId;
//     clinet = await clinet.fetch({
//       useMasterKey: true,
//     });

//     if (!clinet?.authData?.continueWithMobileAuth) {
//       throw 'Invalid User';
//     }

//     clinet.mobileNumber = mobileNumber;

//     await clinet
//       .save(null, {
//         sessionToken: sessionToken,
//       })
//       .then(async () => {
//         clinet.setUsername(mobileNumber);
//         clinet.authData = {
//           continueWithMobileAuth: {
//             id: mobileNumber,
//             OTP: otp,
//           },
//         };
//         const sessions = await new Parse.Query(Parse.Session)
//           .equalTo('user', clinet)
//           .limit(200)
//           .find({
//             useMasterKey: true,
//           });
//         Parse.Session.destroyAll(sessions, {useMasterKey: true});
//         clinet.save(null, {
//           useMasterKey: true,
//         });
//       });
//   },
//   {
//     requireAnyUserRoles: [Foodify_Role, Client_Role],
//     requireUser: true,
//     fields: {
//       userId: {
//         required: true,
//         type: String,
//       },
//       otp: {
//         required: true,
//         type: String,
//       },
//       mobileNumber: {
//         required: true,
//         type: String,
//       },
//     },
//   }
// );

// Parse.Cloud.define(
//   'signupDeliveryman',
//   async request => {
//     const {mobileNumber, fullName} = request.params;
//     const user = request.user as User;
//     const sessionToken = user?.getSessionToken();

//     const chekcOldUser = await new Parse.Query(User)
//       .equalTo('authData.continueWithMobileAuth_deliveryman.id', mobileNumber)
//       .first({useMasterKey: true});

//     if (chekcOldUser) {
//       throw 'Account is already exist';
//     }

//     const newUser = new User();
//     newUser.fullName = fullName;
//     newUser.authData = {
//       continueWithMobileAuth_deliveryman: {
//         id: mobileNumber,
//         OTP: '000000',
//       },
//     };

//     const [deliverymanOnlineStatus] = await Promise.all([
//       new Parse.Query(OnlineStatus).equalTo('code', '2').first(),
//     ]);
//     const savedUser = await newUser.save(null, {useMasterKey: true});

//     const deliveryman = new Deliveryman();
//     deliveryman.setACL(set_deliveryman_ACL(savedUser));

//     deliveryman.user = savedUser;
//     deliveryman.deliverymanOnlineStatus = deliverymanOnlineStatus!;

//     deliveryman.location = new DeliverymanCurrentLocation();
//     deliveryman.location.location = new Parse.GeoPoint({
//       latitude: 0,
//       longitude: 0,
//     });
//     deliveryman.location.setACL(set_deliveryman_location_ACL(savedUser));

//     deliveryman.save(null, {sessionToken: sessionToken});
//     return savedUser;
//   },
//   {
//     requireAnyUserRoles: [Foodify_Manager_Role, Foodify_Content_Manager_Role],
//     requireUser: true,
//     fields: {
//       mobileNumber: {
//         required: true,
//         type: String,
//       },
//       fullName: {
//         required: true,
//         type: String,
//       },
//     },
//   }
// );

// Parse.Cloud.define(
//   'getRestaurantsData',
//   async request => {
//     const user = request.user as User;
//     const sessionToken = user?.getSessionToken();

//     const roles = await new Parse.Query(Parse.Role)
//       .equalTo('users', user)
//       .endsWith('name', 'Cashier')
//       .find({sessionToken: sessionToken});

//     return await getRestaurantsOrders(roles, sessionToken);
//   },
//   {
//     requireUser: true,
//   }
// );

// function set_deliveryman_ACL(savedUser: User) {
//   const deliveryman_ACL = new Parse.ACL();
//   deliveryman_ACL.setPublicReadAccess(false);
//   deliveryman_ACL.setPublicWriteAccess(false);

//   deliveryman_ACL.setRoleReadAccess(Foodify_Role, true);
//   deliveryman_ACL.setRoleReadAccess(Client_Role, true);
//   deliveryman_ACL.setRoleReadAccess(Restaurant_Role, true);

//   deliveryman_ACL.setRoleReadAccess(Foodify_Manager_Role, true);
//   deliveryman_ACL.setRoleReadAccess(Foodify_Manager_Role, true);
//   deliveryman_ACL.setRoleWriteAccess(Foodify_Manager_Role, true);
//   deliveryman_ACL.setRoleWriteAccess(Foodify_Content_Manager_Role, true);
//   deliveryman_ACL.setReadAccess(savedUser, true);

//   return deliveryman_ACL;
// }

// function set_deliveryman_location_ACL(savedUser: User) {
//   const deliveryman_ACL = new Parse.ACL();
//   deliveryman_ACL.setPublicReadAccess(false);
//   deliveryman_ACL.setPublicWriteAccess(false);

//   deliveryman_ACL.setRoleReadAccess(Foodify_Role, true);
//   deliveryman_ACL.setRoleReadAccess(Client_Role, true);
//   deliveryman_ACL.setRoleReadAccess(Restaurant_Role, true);

//   deliveryman_ACL.setRoleReadAccess(Foodify_Manager_Role, true);
//   deliveryman_ACL.setRoleReadAccess(Foodify_Manager_Role, true);
//   deliveryman_ACL.setRoleWriteAccess(Foodify_Manager_Role, true);
//   deliveryman_ACL.setRoleWriteAccess(Foodify_Content_Manager_Role, true);
//   deliveryman_ACL.setReadAccess(savedUser, true);
//   deliveryman_ACL.setWriteAccess(savedUser, true);

//   return deliveryman_ACL;
// }

// Parse.Cloud.beforeSave(
//   'Doctor',
//   async request => {
//     console.log(
//       'fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
//     );
//   },
//   {
//     fields: {
//       fuulname: {
//         required: true,
//         type: String,
//       },
//       age: {
//         required: true,
//         type: Number,
//         options: (value: number) => {
//           if (value < 20) {
//             throw 'Must be older than 20';
//           }
//         },
//       },
//     },
//   }
// );

Parse.Cloud.define('AddDoctor', async req => {
  const {age, fullname} = req.params;

  const doctor = new Doctor();
   return await doctor.save();
});
