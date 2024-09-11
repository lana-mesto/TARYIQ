// import User from '../../models/User';
// import UserBlock from '../../models/UserBlock';

// Parse.Cloud.beforeSave(User, async request => {
//   const object = request.object;
//   const user = request.user as User;
//   console.log(user);

//   const authData = object?.authData;

//   console.log(authData);

//   const masterKeyUsed = request.master;
//   request.context = {isNew: object.isNew()};

//   if (request.context.isNew) {
//     object.deleted = false;

//     const user_acl = new Parse.ACL();
//     user_acl.setPublicReadAccess(false);
//     user_acl.setPublicWriteAccess(false);

//     const userBlock = new UserBlock();
//     userBlock.isUserBlocked = false;

//     const userBlock_acl = new Parse.ACL();
//     userBlock_acl.setPublicReadAccess(false);
//     userBlock_acl.setPublicWriteAccess(false);
//     userBlock_acl.setRoleReadAccess(Foodify_Role, true);

//     if (request.context.RestaurantUser && masterKeyUsed) {
//       user_acl.setRoleReadAccess(Foodify_Manager_Role, true);
//       user_acl.setRoleWriteAccess(Foodify_Manager_Role, true);
//       user_acl.setRoleReadAccess(
//         request.context.single_Restaurant_Manager_Role as string,
//         true
//       );
//       user_acl.setRoleWriteAccess(
//         request.context.single_Restaurant_Manager_Role as string,
//         true
//       );
//       userBlock_acl.setRoleWriteAccess(Foodify_Manager_Role, true);
//       userBlock_acl.setRoleWriteAccess(
//         request.context.single_Restaurant_Manager_Role as string,
//         true
//       );
//     } else if (request.context.FoodifyUser && masterKeyUsed) {
//       user_acl.setRoleReadAccess(Foodify_Role, true);
//       user_acl.setRoleReadAccess(Foodify_Manager_Role, true);
//       user_acl.setRoleWriteAccess(Foodify_Manager_Role, true);
//       userBlock_acl.setRoleWriteAccess(Foodify_Manager_Role, true);
//     } else {
//       if (!user && !authData && !masterKeyUsed) {
//         throw 'Forbiden sigup...!';
//       }

//       user_acl.setRoleReadAccess(Restaurant_Role, true);
//       user_acl.setRoleReadAccess(Foodify_Role, true);
//       if (authData?.continueWithMobileAuth) {
//         user_acl.setRoleWriteAccess(Foodify_Role, true);
//         userBlock_acl.setRoleWriteAccess(Foodify_Role, true);
//         object.mobileNumber = object.authData.continueWithMobileAuth?.id!;
//       } else if (authData?.continueWithMobileAuth_deliveryman) {
//         user_acl.setRoleReadAccess(Restaurant_Role, true);
//         user_acl.setRoleReadAccess(Foodify_Manager_Role, true);
//         user_acl.setRoleReadAccess(Foodify_Content_Manager_Role, true);
//         user_acl.setRoleWriteAccess(Foodify_Manager_Role, true);
//         user_acl.setRoleWriteAccess(Foodify_Content_Manager_Role, true);

//         userBlock_acl.setRoleReadAccess(Restaurant_Role, true);
//         userBlock_acl.setRoleReadAccess(Foodify_Manager_Role, true);
//         userBlock_acl.setRoleReadAccess(Foodify_Content_Manager_Role, true);
//         userBlock_acl.setRoleWriteAccess(Foodify_Manager_Role, true);
//         userBlock_acl.setRoleWriteAccess(Foodify_Content_Manager_Role, true);
//         object.mobileNumber =
//           object.authData.continueWithMobileAuth_deliveryman?.id!;
//       }
//     }

//     object.setACL(user_acl);
//     userBlock.setACL(userBlock_acl);

//     if (object.gender) {
//       if (!(object.gender === 'male' || object.gender === 'female')) {
//         throw 'male or female values are allowed.';
//       }
//     }

//     object.userBlock = await userBlock.save(null, {useMasterKey: true});
//   }
// });

// Parse.Cloud.afterSave(User, async request => {
//   const user = request.object;
//   const authData = user.authData;
//   const isNew = request.context.isNew ?? false;
//   console.log('++++++++++++++++++++++++++++++++++++');
//   console.log('isNew: ' + isNew);
//   console.log('++++++++++++++++++++++++++++++++++++');
//   if (isNew) {
//     console.log('++++++++++++++++++++++++++++++++++++');
//     console.log('Add User to userBlock class');
//     console.log('++++++++++++++++++++++++++++++++++++');
//     const userBlock = user.userBlock;
//     const userBlock_acl = user.getACL();
//     userBlock_acl?.setReadAccess(`${user.id}`, true);
//     userBlock_acl?.setWriteAccess(`${user.id}`, false);

//     userBlock.setACL(userBlock_acl!);
//     userBlock.save(null, {useMasterKey: true});

//     if (authData?.continueWithMobileAuth) {
//       console.log('++++++++++++++++++++++++++++++++++++');
//       console.log('Add Client_Role');
//       console.log('++++++++++++++++++++++++++++++++++++');

//       const RoleQuery = new Parse.Query(Parse.Role);
//       RoleQuery.equalTo('name', Client_Role);
//       const role = await RoleQuery.first({useMasterKey: true});
//       if (!role) {
//         throw 'no such role found';
//       }
//       role.getUsers().add(user);
//       role.save(null, {useMasterKey: true});
//     } else if (authData?.continueWithMobileAuth_deliveryman) {
//       console.log('++++++++++++++++++++++++++++++++++++');
//       console.log('Add Deliveryman_Role');
//       console.log('++++++++++++++++++++++++++++++++++++');

//       const RoleQuery = new Parse.Query(Parse.Role);
//       RoleQuery.equalTo('name', Deliveryman_Role);
//       const role = await RoleQuery.first({useMasterKey: true});
//       if (!role) {
//         throw 'no such role found';
//       }
//       role.getUsers().add(user);
//       role.save(null, {useMasterKey: true});
//     }
//   }
// });

// Parse.Cloud.beforeLogin(async request => {
//   let user = request.object as User;
//   user = await user?.fetchWithInclude(['userBlock'], {
//     useMasterKey: true,
//   });

//   if (!user?.userBlock || user?.userBlock?.isUserBlocked) {
//     throw new Error('Access denied, Your account is blocked.');
//   }
// });

// // Parse.Cloud.afterLogin(async request => {
// //   let user = request.object as User;
// //   user = await user?.fetchWithInclude(['profilePic'], {
// //     useMasterKey: true,
// //   });
// // });

// // Parse.Cloud.afterLogout(async request => {
// //   const {object: session} = request;
// //   const user: User = await session?.get('user').fetch({useMasterKey: true});
// //   const fcm_token: string = await session?.get('user')?.get('fcm_token');

// //   const checkRole = await new Parse.Query(Parse.Role)
// //     .equalTo('users', user)
// //     .first({useMasterKey: true});
// //   if (checkRole && fcm_token) {
// //     const roleName = checkRole?.getName();
// //     unsubscribeFromTopic(roleName, [fcm_token]);
// //   }
// //   user.unset('fcm_token');
// //   user.save(null, {useMasterKey: true});
// // });
// Parse.Cloud.afterLogout(async request => {
//   const user = request.user as User;

//   const authData = user?.authData;
//   if (authData?.continueWithMobileAuth_deliveryman) {
//     const deliveryman = await new Parse.Query(Deliveryman)
//       .equalTo('user', user)
//       .first({useMasterKey: true});
//     if (deliveryman) {
//       const offlineStatus = await new Parse.Query(OnlineStatus)
//         .equalTo('code', '2')
//         .first();

//       deliveryman.deliverymanOnlineStatus = offlineStatus!;
//       deliveryman.save(null, {useMasterKey: true});
//     }
//   }
// });
