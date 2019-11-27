define({ "api": [
  {
    "type": "get",
    "url": "/api/v1/meetings/:meetingId/getSingleMeeting",
    "title": "to get single meeting",
    "version": "1.0.0",
    "group": "meetings",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>of the user passed as a query parameter(required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "meetingId",
            "description": "<p>of the user passed as a url parameter(required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"error\":false,\n \"message\":\"Details Found\",\n \"status\":200,\n  \"data\": {\n            \"title\": \"meeting planner Review\",\n            \"purpose\": \"to test application update\",\n            \"location\": \"hyderabad\",\n            \"color\": \"#00ff00\",\n            \"meetingId\": \"47MChBzK\",\n            \"start\": \"2019-11-30T20:30:00.000Z\",\n            \"end\": \"2019-11-30T20:30:00.000Z\",\n            \"startHour\": 1,\n            \"startMinute\": 33,\n            \"endHour\": 20,\n            \"endMinute\": 30,\n            \"adminId\": \"2g4DtolR\",\n            \"adminUserName\": \"undefined\",\n            \"userId\": \"ERE32e8s\",\n            \"createdAt\": \"2019-11-25T20:26:57.707Z\",\n            \"updatedAt\": \"2019-11-27T11:54:53.645Z\"\n          }\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"error\":true,\n  \"message\":\"Error Occured\",\n  \"status\":400/500/403,\n  \"data\":null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/meetingRoute.js",
    "groupTitle": "meetings",
    "name": "GetApiV1MeetingsMeetingidGetsinglemeeting"
  },
  {
    "type": "get",
    "url": "/api/v1/meetings/:userId/getAllMeetingsByUser",
    "title": "to get all meetings of user",
    "version": "1.0.0",
    "group": "meetings",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>of the user passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>of the user passed as a body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"error\":false,\n \"message\":\"meetings of the user Are Listed\",\n \"status\":200,\n \"data\": [\n            {\n            \"title\": \"meeting planner Review\",\n            \"purpose\": \"to test application update\",\n            \"location\": \"hyderabad\",\n            \"color\": \"#00ff00\",\n            \"meetingId\": \"47MChBzK\",\n            \"start\": \"2019-11-30T20:30:00.000Z\",\n            \"end\": \"2019-11-30T20:30:00.000Z\",\n            \"startHour\": 1,\n            \"startMinute\": 33,\n            \"endHour\": 20,\n            \"endMinute\": 30,\n            \"adminId\": \"2g4DtolR\",\n            \"adminUserName\": \"giri prasad\",\n            \"userId\": \"ERE32e8s\",\n            \"createdAt\": \"2019-11-25T20:26:57.707Z\",\n            \"updatedAt\": \"2019-11-27T11:54:53.645Z\"\n          },\n          {\n            \"title\": \"test notification mail updated\",\n            \"purpose\": \"to test application update\",\n            \"location\": \"hyderabad\",\n            \"color\": \"#00f500\",\n            \"meetingId\": \"27MChBzK\",\n            \"start\": \"2019-11-30T20:30:00.000Z\",\n            \"end\": \"2019-11-30T20:30:00.000Z\",\n            \"startHour\": 1,\n            \"startMinute\": 33,\n            \"endHour\": 20,\n            \"endMinute\": 30,\n            \"adminId\": \"5g4DtolR\",\n            \"adminUserName\": \"test admin\",\n            \"userId\": \"ERE32e8s\",\n            \"createdAt\": \"2019-11-25T20:26:57.707Z\",\n            \"updatedAt\": \"2019-11-27T11:54:53.645Z\"\n          }    \n\n         ]  \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"error\":true,\n  \"message\":\"Error Occured while retriving all meetings of a user\",\n  \"status\":500,\n  \"data\":null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/meetingRoute.js",
    "groupTitle": "meetings",
    "name": "GetApiV1MeetingsUseridGetallmeetingsbyuser"
  },
  {
    "type": "get",
    "url": "/api/v1/meetings/view/all",
    "title": "to get all meetings",
    "version": "1.0.0",
    "group": "meetings",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>of the user passed as a body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"error\":false,\n \"message\":\"meetings  List\",\n \"status\":200,\n \"data\": [\n            {\n            \"title\": \"meeting planner Review\",\n            \"purpose\": \"to test application update\",\n            \"location\": \"hyderabad\",\n            \"color\": \"#00ff00\",\n            \"meetingId\": \"47MChBzK\",\n            \"start\": \"2019-11-30T20:30:00.000Z\",\n            \"end\": \"2019-11-30T20:30:00.000Z\",\n            \"startHour\": 1,\n            \"startMinute\": 33,\n            \"endHour\": 20,\n            \"endMinute\": 30,\n            \"adminId\": \"2g4DtolR\",\n            \"adminUserName\": \"giri prasad\",\n            \"userId\": \"ERE32e8s\",\n            \"createdAt\": \"2019-11-25T20:26:57.707Z\",\n            \"updatedAt\": \"2019-11-27T11:54:53.645Z\"\n          },\n          {\n            \"title\": \"test notification mail updated\",\n            \"purpose\": \"to test application update\",\n            \"location\": \"hyderabad\",\n            \"color\": \"#00f500\",\n            \"meetingId\": \"27MChBzK\",\n            \"start\": \"2019-11-30T20:30:00.000Z\",\n            \"end\": \"2019-11-30T20:30:00.000Z\",\n            \"startHour\": 1,\n            \"startMinute\": 33,\n            \"endHour\": 20,\n            \"endMinute\": 30,\n            \"adminId\": \"5g4DtolR\",\n            \"adminUserName\": \"test admin\",\n            \"userId\": \"ERE32e8s\",\n            \"createdAt\": \"2019-11-25T20:26:57.707Z\",\n            \"updatedAt\": \"2019-11-27T11:54:53.645Z\"\n          }    \n\n         ]  \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"error\":true,\n  \"message\":\"Error Occured\",\n  \"status\":400/500/403,\n  \"data\":null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/meetingRoute.js",
    "groupTitle": "meetings",
    "name": "GetApiV1MeetingsViewAll"
  },
  {
    "type": "post",
    "url": "/api/v1/meetings/createmeeting",
    "title": "api to create meeting",
    "version": "1.0.0",
    "group": "meetings",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "meetingTitle",
            "description": "<p>meetingTitle of the meeting passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "meetingPurpose",
            "description": "<p>meetingPurpose of the meeting passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "meetingPlace",
            "description": "<p>meetingPlace of the meeting passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user to whom meeting is assigned passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userName",
            "description": "<p>userName of the user to whom meeting is assigned passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "adminId",
            "description": "<p>adminId of the user who created the meeting passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "adminUserName",
            "description": "<p>adminUserName of the user who created the meeting passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "meetingDate",
            "description": "<p>meetingDate of the meeting passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "meetingStartTime",
            "description": "<p>meetingStartTime of the meeting passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "meetingEndTime",
            "description": "<p>meetingEndTime of the meeting passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>of the user passed as a body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"error\":false,\n \"message\":\"meeting Is Created Successfully\",\n \"status\":200,\n \"data\":\n         {\n            \"title\": \"meeting planner Review\",\n            \"purpose\": \"to test application update\",\n            \"location\": \"hyderabad\",\n            \"color\": \"#00ff00\",\n            \"meetingId\": \"47MChBzK\",\n            \"start\": \"2019-11-30T20:30:00.000Z\",\n            \"end\": \"2019-11-30T20:30:00.000Z\",\n            \"startHour\": 1,\n            \"startMinute\": 33,\n            \"endHour\": 20,\n            \"endMinute\": 30,\n            \"adminId\": \"2g4DtolR\",\n            \"adminUserName\": \"undefined\",\n            \"userId\": \"ERE32e8s\",\n            \"createdAt\": \"2019-11-25T20:26:57.707Z\",\n            \"updatedAt\": \"2019-11-27T11:54:53.645Z\"\n          }  \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"error\":true,\n  \"message\":\"Error Occured\",\n  \"status\":400/500/403,\n  \"data\":null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/meetingRoute.js",
    "groupTitle": "meetings",
    "name": "PostApiV1MeetingsCreatemeeting"
  },
  {
    "type": "post",
    "url": "/api/v1/meetings/deleteMeeting",
    "title": "delete meeting",
    "version": "1.0.0",
    "group": "meetings",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>of the user passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "meetingId",
            "description": "<p>of the user passed as a body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"error\":false,\n \"message\":\"meeting Is Deleted Successfully\",\n \"status\":200,\n \"data\": []  \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"error\":true,\n  \"message\":\"Error Occured while deleting\",\n  \"status\":500,\n  \"data\":null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/meetingRoute.js",
    "groupTitle": "meetings",
    "name": "PostApiV1MeetingsDeletemeeting"
  },
  {
    "type": "put",
    "url": "/api/v1/meetings/:meetingId/updateMeeting",
    "title": "api to update meeting",
    "version": "1.0.0",
    "group": "meetings",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>of the user passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "meetingId",
            "description": "<p>of the user passed as a body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"error\":false,\n \"message\":\"meeting Is Edited Successfully\",\n \"status\":200,\n \"data\": [\n            \"n\": 1,\n            \"nModified\": 1,\n             \"ok\": 1\n         ]  \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"error\":true,\n  \"message\":\"Error Occured\",\n  \"status\":400/500/403,\n  \"data\":null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/meetingRoute.js",
    "groupTitle": "meetings",
    "name": "PutApiV1MeetingsMeetingidUpdatemeeting"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/view/all",
    "title": "api to get allusers.*",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "     {\n         \"error\": false,\n         \"message\": \"All User Details Found\",\n         \"status\": 200,\n         \"data\": [\n\t\t\t\t {\n                  \"firstName\": \"testuser\",\n                  \"lastName\": \"mp\",\n                  \"isAdmin\": true,\n                  \"email\": \"testusermp04@gmail.com\",\n                  \"countryCode\": \" 91\",\n                  \"userId\": \"Ph5K-Be7\",\n                  \"userName\": \"testuser-admin\",\n                  \"mobileNumber\": 8008434546,\n                  \"createdAt\": \"2019-11-22T18:27:31.135Z\",\n                  \"updatedAt\": \"2019-11-22T20:18:36.230Z\",\n                  \"resetPasswordToken\": \"token\"\n              },\n              {\n                  \"firstName\": \"giri\",\n                  \"lastName\": \"poonati\",\n                 \"isAdmin\": true,\n                  \"email\": \"girippoonati@gmail.com\",\n                  \"resetPasswordToken\": \"token\",\n                  \"countryCode\": \"374\",\n                  \"userId\": \"2g4DtolR\",\n                  \"userName\": \"giri-admin\",\n                  \"mobileNumber\": 7865489655,\n                  \"createdAt\": \"2019-11-22T18:55:23.828Z\",\n                  \"updatedAt\": \"2019-11-22T18:55:23.828Z\"\n              }\n  \t\t]\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n  \"error\": true,\n  \"message\": \"Failed To Find User Details\",\n  \"status\": 500,\n  \"data\": null\n\n }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/userRoute.js",
    "groupTitle": "users",
    "name": "GetApiV1UsersViewAll"
  },
  {
    "type": "post",
    "url": "/api/v1/users/forgotPassword",
    "title": "api to generate Reset Token",
    "version": "1.0.0",
    "group": "users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>of the user passed as a body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"error\":false,\n \"message\":\"Password Reset Token Sent successfully\",\n \"status\":200,\n \"data\": []\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"error\":true,\n  \"message\":\"Error Occured\",\n  \"status\":400,\n  \"data\":null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/userRoute.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersForgotpassword"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/login",
    "title": "api for user login.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Login Successful\",\n    \"status\": 200,\n    \"data\": {\n        \"authToken\": \"lkjyJhbGciOiJIUertyuiopojhgfdwertyuVCJ9.MCwiZXhwIjoxNTIwNDI29tIiwibGFzdE5hbWUiE4In19.hAR744xIY9K53JWm1rQ2mc\",\n        \"userDetails\": {\n        \"data\": {\n               \"firstName\": \"giri\",\n               \"lastName\": \"poonati\",\n               \"isAdmin\": true,\n                \"email\": \"girippoonati@gmail.com\",\n                \"resetPasswordToken\": \"token\",\n                \"countryCode\": \"374\",\n                \"userId\": \"2g4DtolR\",\n                \"userName\": \"giri-admin\",\n                \"mobileNumber\": 7865489655,\n                \"createdAt\": \"2019-11-22T18:55:23.828Z\",\n                \"updatedAt\": \"2019-11-22T18:55:23.828Z\"\n            \n    `      }\n    }\n\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n  \"error\": true,\n  \"message\": \"Failed To Login User\",\n  \"status\": 500,\n  \"data\": null\n }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/userRoute.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersLogin"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/logout",
    "title": "api to logout user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (auth headers) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Logged Out Successfully\",\n    \"status\": 200,\n    \"data\": null\n\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/userRoute.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersLogout"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/resetPassword",
    "title": "api to reset password.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "resetPasswordToken",
            "description": "<p>of the user passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>of the user passed as a body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"error\": false,\n   \"message\": \"Your Password Is Reset Successfully\",\n   \"status\": 200,\n   \"data\": {\n              \"firstName\": \"Anvesh Reddy\",\n              \"lastName\": \"Yedavelly\",\n              \"isAdmin\": false,\n              \"email\": \"vc16anvesh@gmail.com\",\n              \"countryCode\": \" 91\",\n              \"userId\": \"ERE32e8s\",\n              \"userName\": \"anvesh-004\",\n              \"mobileNumber\": 8008434433,\n              \"createdAt\": \"2019-11-21T15:19:01.470Z\",\n              \"updatedAt\": \"2019-11-27T16:34:46.683Z\",\n           }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n  \"error\": true,\n  \"message\": \"Failed To Login User\",\n  \"status\": 500,\n  \"data\": null\n }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/userRoute.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersResetpassword"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/signup",
    "title": "api for user signup.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "firstName",
            "description": "<p>firstName of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "lastName",
            "description": "<p>lastName of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userName",
            "description": "<p>userName of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "countryCode",
            "description": "<p>countryCode for the mobile number of user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>mobileNumber of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "email",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "password",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"error\": false,\n \"message\": \"User created\",\n \"status\": 200,\n \"data\": {\n               \"firstName\": \"giri\",\n               \"lastName\": \"poonati\",\n               \"isAdmin\": true,\n                \"email\": \"girippoonati@gmail.com\",\n                \"resetPasswordToken\": \"token\",\n                \"countryCode\": \"374\",\n                \"userId\": \"2g4DtolR\",\n                \"userName\": \"giri-admin\",\n                \"mobileNumber\": 7865489655,\n                \"createdAt\": \"2019-11-22T18:55:23.828Z\",\n                \"updatedAt\": \"2019-11-22T18:55:23.828Z\"\n            \n    `      }\n\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"error\": true,\n  \"message\": \"Failed To create User\",\n  \"status\": 500,\n  \"data\": null\n }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/userRoute.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersSignup"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/:userId/details",
    "title": "api for get single user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>The userId should be passed as the URL parameter</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"User Details Found\",\n    \"status\": 200,\n    \"data\": {\n               \"firstName\": \"giri\",\n               \"lastName\": \"poonati\",\n               \"isAdmin\": true,\n                \"email\": \"girippoonati@gmail.com\",\n                \"resetPasswordToken\": \"token\",\n                \"countryCode\": \"374\",\n                \"userId\": \"2g4DtolR\",\n                \"userName\": \"giri-admin\",\n                \"mobileNumber\": 7865489655,\n                \"createdAt\": \"2019-11-22T18:55:23.828Z\",\n                \"updatedAt\": \"2019-11-22T18:55:23.828Z\"\n            \n    `      }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n  \"error\": true,\n  \"message\": \"Error Occured.\",\n  \"status\": 500,\n  \"data\": null\n }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/userRoute.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersUseridDetails"
  }
] });
