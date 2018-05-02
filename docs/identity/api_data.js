define({ "api": [
  {
    "type": "patch",
    "url": "/users/pass",
    "title": "b. Update exist password",
    "name": "PatchAuth",
    "group": "Auth",
    "permission": [
      {
        "name": "JWT (Admin)"
      }
    ],
    "header": {
      "fields": {
        "Auth": [
          {
            "group": "Auth",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT {Token}</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Body x-www": [
          {
            "group": "Body x-www",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Your email [email]</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Actually Password [min 3, max 150]</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": false,
            "field": "newpass",
            "description": "<p>New Password [min 3, max 150]</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 202 OK\n{}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/identity/routers/profile/users.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/users/auth",
    "title": "a. Authenticate",
    "name": "PostAuth",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Body x-www": [
          {
            "group": "Body x-www",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Your email [email]</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password [min 3, max 150]</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "JWT (Admin)"
      }
    ],
    "header": {
      "fields": {
        "Auth": [
          {
            "group": "Auth",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT {Token}</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 202 OK\n{\n     token: (String),\n     users: {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/identity/routers/profile/users.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/users/forgot",
    "title": "c. Send a forgot email",
    "name": "PostForgotAuth",
    "group": "Auth",
    "description": "<p>Send a email with url callback for recorver</p>",
    "permission": [
      {
        "name": "JWT (Admin)"
      }
    ],
    "header": {
      "fields": {
        "Auth": [
          {
            "group": "Auth",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT {Token}</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Body x-www": [
          {
            "group": "Body x-www",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Your email [email]</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": false,
            "field": "callback_url",
            "description": "<p>Url for callback</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 202 OK\n{}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/identity/routers/profile/users.js",
    "groupTitle": "Auth"
  },
  {
    "type": "put",
    "url": "/users/forgot/change",
    "title": "d. Change password",
    "name": "PutForgotChangeAuth",
    "group": "Auth",
    "permission": [
      {
        "name": "JWT (Admin)"
      }
    ],
    "header": {
      "fields": {
        "Auth": [
          {
            "group": "Auth",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT {Token}</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Body x-www": [
          {
            "group": "Body x-www",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>New Password [min 3 max 30]</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token received in forgot entity</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 202 OK\n{}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/identity/routers/profile/users.js",
    "groupTitle": "Auth"
  },
  {
    "type": "delete",
    "url": "/me",
    "title": "c. Delete this profile",
    "name": "DeleteMe",
    "group": "Me",
    "permission": [
      {
        "name": "JWT (Admin)"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT {Token}</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "PermissionError",
            "description": "<p>Token don`t have permission</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Invalid Token</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Entity not exist</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 204 OK\n{}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/identity/routers/profile/me.js",
    "groupTitle": "Me"
  },
  {
    "type": "get",
    "url": "/me",
    "title": "a. Get my profile",
    "name": "GetMe",
    "group": "Me",
    "description": "<p>Get all information about the logged user.</p>",
    "permission": [
      {
        "name": "JWT (Read | Write | Admin)"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT {Token}</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Invalid Token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 202 OK\n{\n   _id: (String)\n   created_at: (Datetime)\n   updated_at: (Datetime)\n   fields: (Mixed)\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/identity/routers/profile/me.js",
    "groupTitle": "Me"
  },
  {
    "type": "patch",
    "url": "/me",
    "title": "b. Update profile",
    "name": "PatchMe",
    "group": "Me",
    "permission": [
      {
        "name": "JWT (Read | Write | Admin)"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT {Token}</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Body x-www": [
          {
            "group": "Body x-www",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Username, used in profile label [min 3 max 30]</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email, used in auth [email]</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password, will be encrypted</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": true,
            "field": "fullname",
            "description": "<p>Fullname</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": true,
            "field": "phone",
            "description": "<p>Phone number</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": true,
            "field": "company",
            "description": "<p>Company</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": true,
            "field": "avatar",
            "description": "<p>Avatar</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": true,
            "field": "job",
            "description": "<p>Job</p>"
          },
          {
            "group": "Body x-www",
            "type": "Object",
            "optional": true,
            "field": "country",
            "description": "<p>Country and state</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": true,
            "field": "city",
            "description": "<p>City</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": true,
            "field": "address",
            "description": "<p>Address</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Invalid Token</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Incorrect fields</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 202 OK\n{\n   _id: (String)\n   created_at: (Datetime)\n   updated_at: (Datetime)\n   fields: (Mixed)\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/identity/routers/profile/me.js",
    "groupTitle": "Me"
  },
  {
    "type": "delete",
    "url": "/teams/:id",
    "title": "i. Delete team",
    "name": "DeleteSingleTeam",
    "group": "Teams",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Teams unique ID.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "JWT (Admin)"
      }
    ],
    "header": {
      "fields": {
        "Auth": [
          {
            "group": "Auth",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT {Token}</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "PermissionError",
            "description": "<p>Token don`t have permission</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Invalid Token</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "NotFound",
            "description": "<p>List is empty</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 204 OK",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/identity/routers/teams/teams.js",
    "groupTitle": "Teams"
  },
  {
    "type": "delete",
    "url": "/teams/:id/members/:idu",
    "title": "n. Delete single member team",
    "name": "DeleteTeamMembers",
    "group": "Teams",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Teams unique ID.</p>"
          },
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "idu",
            "description": "<p>Member unique ID [Users, Teams].</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "JWT (Admin)"
      }
    ],
    "header": {
      "fields": {
        "Auth": [
          {
            "group": "Auth",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT {Token}</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "PermissionError",
            "description": "<p>Token don`t have permission</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Invalid Token</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "NotFound",
            "description": "<p>List is empty</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 204 OK",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/identity/routers/teams/teams.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/teams/:id",
    "title": "e. Get single team",
    "name": "GetSingleTeam",
    "group": "Teams",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Teams unique ID.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "JWT (Read | Write | Admin)"
      }
    ],
    "header": {
      "fields": {
        "Auth": [
          {
            "group": "Auth",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT {Token}</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "PermissionError",
            "description": "<p>Token don`t have permission</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Invalid Token</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "NotFound",
            "description": "<p>List is empty</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   _id: (String)\n   created_at: (Datetime)\n   updated_at: (Datetime)\n   roles: []\n   owner: []\n   _links: {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/identity/routers/teams/teams.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/teams",
    "title": "a. Get list of yours teams",
    "name": "GetTeams",
    "group": "Teams",
    "parameter": {
      "fields": {
        "Query": [
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "email",
            "description": "<p>Filter by email.</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>Filter by name.</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "url",
            "description": "<p>Filter by url.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "JWT (Read | Write | Admin)"
      }
    ],
    "header": {
      "fields": {
        "Auth": [
          {
            "group": "Auth",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT {Token}</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "PermissionError",
            "description": "<p>Token don`t have permission</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Invalid Token</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "NotFound",
            "description": "<p>List is empty</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   found: 3,\n   limit: 20,\n   total_pages: 1,\n   current_page: 1,\n   items: []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/identity/routers/teams/teams.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/teams/autocomplete",
    "title": "c. Autocomplete team name",
    "name": "GetTeamsAutocomplete",
    "group": "Teams",
    "parameter": {
      "fields": {
        "Query": [
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "complete",
            "description": "<p>Filter by name with regex like &quot;%term%&quot;&quot;.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "JWT (Read | Write | Admin)"
      }
    ],
    "header": {
      "fields": {
        "Auth": [
          {
            "group": "Auth",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT {Token}</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "PermissionError",
            "description": "<p>Token don`t have permission</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Invalid Token</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "NotFound",
            "description": "<p>List is empty</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   found: 3,\n   limit: 20,\n   total_pages: 1,\n   current_page: 1,\n   items: []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/identity/routers/teams/teams.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/teams/count",
    "title": "b. Get total teams",
    "name": "GetTeamsCount",
    "group": "Teams",
    "parameter": {
      "fields": {
        "Query": [
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "email",
            "description": "<p>Filter by email.</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>Filter by name.</p>"
          },
          {
            "group": "Query",
            "type": "String",
            "optional": true,
            "field": "url",
            "description": "<p>Filter by url.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "JWT (Read | Write | Admin)"
      }
    ],
    "header": {
      "fields": {
        "Auth": [
          {
            "group": "Auth",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT {Token}</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "PermissionError",
            "description": "<p>Token don`t have permission</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Invalid Token</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "NotFound",
            "description": "<p>List is empty</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   count: (Number)\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/identity/routers/teams/teams.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/teams/upload",
    "title": "d. Signed upload workflow",
    "name": "GetTeamsUpload",
    "group": "Teams",
    "description": "<p>Its only to mark and create a token authetication, to upload new files.</p>",
    "parameter": {
      "fields": {
        "Body x-www": [
          {
            "group": "Body x-www",
            "type": "Resource",
            "optional": false,
            "field": "filetype",
            "description": "<p>Resource filetype to upload.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "JWT (Read | Write | Admin)"
      }
    ],
    "header": {
      "fields": {
        "Auth": [
          {
            "group": "Auth",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT {Token}</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "PermissionError",
            "description": "<p>Token don`t have permission</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Invalid Token</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "NotFound",
            "description": "<p>List is empty</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/identity/routers/teams/teams.js",
    "groupTitle": "Teams"
  },
  {
    "type": "patch",
    "url": "/teams/:id",
    "title": "g. Update partial teams",
    "name": "PatchSingleTeam",
    "group": "Teams",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Teams unique ID.</p>"
          }
        ],
        "Body x-www": [
          {
            "group": "Body x-www",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name [min 3, max 150]</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": false,
            "field": "field",
            "description": "<p>Any field describe in Create Doc</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "JWT (Write | Admin)"
      }
    ],
    "header": {
      "fields": {
        "Auth": [
          {
            "group": "Auth",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT {Token}</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "PermissionError",
            "description": "<p>Token don`t have permission</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Invalid Token</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "NotFound",
            "description": "<p>List is empty</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 202 OK\n{}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/identity/routers/teams/teams.js",
    "groupTitle": "Teams"
  },
  {
    "type": "post",
    "url": "/teams/:id/members",
    "title": "j. Add member into team",
    "name": "PostSingleTeamMembers",
    "group": "Teams",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Teams unique ID.</p>"
          }
        ],
        "Body x-www": [
          {
            "group": "Body x-www",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>User/Team name</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": true,
            "field": "email",
            "description": "<p>User/Team email</p>"
          },
          {
            "group": "Body x-www",
            "type": "Number",
            "optional": false,
            "field": "role",
            "description": "<p>Access Permission [1 = Read, 3 = Write, 7 = Admin]</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>User/Team Id</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": false,
            "field": "refs",
            "description": "<p>Entity Type [users | teams | projects]</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "JWT (Admin)"
      }
    ],
    "header": {
      "fields": {
        "Auth": [
          {
            "group": "Auth",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT {Token}</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "PermissionError",
            "description": "<p>Token don`t have permission</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Invalid Token</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "NotFound",
            "description": "<p>List is empty</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/identity/routers/teams/teams.js",
    "groupTitle": "Teams"
  },
  {
    "type": "post",
    "url": "/teams/",
    "title": "f. Create team",
    "name": "PostTeamMembers",
    "group": "Teams",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Teams unique ID.</p>"
          }
        ],
        "Body x-www": [
          {
            "group": "Body x-www",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name [min 3, max 150]</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email [string email]</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": false,
            "field": "avatar",
            "description": "<p>Path to imagem [Url, http, https]</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>Url [min 3, max 150]</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "JWT (Write | Admin)"
      }
    ],
    "header": {
      "fields": {
        "Auth": [
          {
            "group": "Auth",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT {Token}</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "PermissionError",
            "description": "<p>Token don`t have permission</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Invalid Token</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "NotFound",
            "description": "<p>List is empty</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n  \"firstname\": \"John\",\n  \"lastname\": \"Doe\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/identity/routers/teams/teams.js",
    "groupTitle": "Teams"
  },
  {
    "type": "put",
    "url": "/teams/:id",
    "title": "h. Update single teams",
    "name": "PutSingleTeam",
    "group": "Teams",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Teams unique ID.</p>"
          }
        ],
        "Body x-www": [
          {
            "group": "Body x-www",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name [min 3, max 150]</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": false,
            "field": "field",
            "description": "<p>Any field describe in Create Doc</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "JWT (Write | Admin)"
      }
    ],
    "header": {
      "fields": {
        "Auth": [
          {
            "group": "Auth",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT {Token}</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "PermissionError",
            "description": "<p>Token don`t have permission</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Invalid Token</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "NotFound",
            "description": "<p>List is empty</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 204 OK\n{}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/identity/routers/teams/teams.js",
    "groupTitle": "Teams"
  },
  {
    "type": "put",
    "url": "/teams/:id/members",
    "title": "l. Update all members",
    "name": "PutTeamMembers",
    "group": "Teams",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Teams unique ID.</p>"
          }
        ],
        "Body Raw": [
          {
            "group": "Body Raw",
            "type": "Array",
            "optional": false,
            "field": "raw",
            "description": "<p>List with all roles <br/></p> <pre class=\"prettyprint language-json\" data-type=\"json\"> <code>[{ <br/>   \"name\": (String), <br/>   \"email\": (String), <br/>   \"role\": (Number), //'1 | 3 | 7' <br/>   \"id\": (String), <br/>   \"refs\": (String) <br/>}]  </code>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "JWT (Admin)"
      }
    ],
    "header": {
      "fields": {
        "Auth": [
          {
            "group": "Auth",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT {Token}</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "PermissionError",
            "description": "<p>Token don`t have permission</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Invalid Token</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "NotFound",
            "description": "<p>List is empty</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/identity/routers/teams/teams.js",
    "groupTitle": "Teams"
  },
  {
    "type": "put",
    "url": "/teams/:id/members/:idu",
    "title": "m. Update single member",
    "name": "PutTeamMembersSingle",
    "group": "Teams",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Teams unique ID.</p>"
          },
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "idu",
            "description": "<p>Member unique ID [Users, Teams].</p>"
          }
        ],
        "Body x-www": [
          {
            "group": "Body x-www",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>User/Team name</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": true,
            "field": "email",
            "description": "<p>User/Team email</p>"
          },
          {
            "group": "Body x-www",
            "type": "Number",
            "optional": false,
            "field": "role",
            "description": "<p>Access Permission [1 = Read, 3 = Write, 7 = Admin]</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>User/Team Id</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": false,
            "field": "refs",
            "description": "<p>Entity Type [users | teams | projects]</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "JWT (Admin)"
      }
    ],
    "header": {
      "fields": {
        "Auth": [
          {
            "group": "Auth",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT {Token}</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "PermissionError",
            "description": "<p>Token don`t have permission</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Invalid Token</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "NotFound",
            "description": "<p>List is empty</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/identity/routers/teams/teams.js",
    "groupTitle": "Teams"
  },
  {
    "type": "put",
    "url": "/teams/upload",
    "title": "d. Upload file in local server (used only local upload is enabled)",
    "name": "PutUploadTeams",
    "group": "Teams",
    "parameter": {
      "fields": {
        "params": [
          {
            "group": "params",
            "type": "String",
            "optional": false,
            "field": "ext",
            "description": "<p>Used to construct url</p>"
          },
          {
            "group": "params",
            "type": "String",
            "optional": false,
            "field": "folder",
            "description": "<p>Mark a group folder, that file will be upload (users, teams or company)</p>"
          }
        ],
        "Body x-www": [
          {
            "group": "Body x-www",
            "type": "Resource",
            "optional": false,
            "field": "filetype",
            "description": "<p>Resource filetype to upload.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "JWT (Read | Write | Admin)"
      }
    ],
    "header": {
      "fields": {
        "Auth": [
          {
            "group": "Auth",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT {Token}</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "PermissionError",
            "description": "<p>Token don`t have permission</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Invalid Token</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "NotFound",
            "description": "<p>List is empty</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/identity/routers/teams/teams.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/users/autocomplete",
    "title": "c. Get list user with autocomplete",
    "name": "GetAutocompleteUsers",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "complete",
            "description": "<p>Filter by name with regex like &quot;%term%&quot;&quot;.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "JWT"
      }
    ],
    "header": {
      "fields": {
        "Auth": [
          {
            "group": "Auth",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT {Token}</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   found: 3,\n   limit: 20,\n   total_pages: 1,\n   current_page: 1,\n   items: []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/identity/routers/profile/users.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/users/:id",
    "title": "e. Get single profile",
    "name": "GetSingleUsers",
    "group": "Users",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>User unique id.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "JWT (Read | Write | Admin)"
      }
    ],
    "header": {
      "fields": {
        "Auth": [
          {
            "group": "Auth",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT {Token}</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   _id: (String)\n   created_at: (Datetime)\n   updated_at: (Datetime)\n   roles: []\n   owner: []\n   _links: {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/identity/routers/profile/users.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/users/upload",
    "title": "d. Signed upload workflow",
    "name": "GetUploadUsers",
    "group": "Users",
    "description": "<p>Its only to mark and create a token authetication, to upload new files.</p>",
    "parameter": {
      "fields": {
        "Body x-www": [
          {
            "group": "Body x-www",
            "type": "Resource",
            "optional": false,
            "field": "filetype",
            "description": "<p>Resource filetype to upload.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "JWT (Read | Write | Admin)"
      }
    ],
    "header": {
      "fields": {
        "Auth": [
          {
            "group": "Auth",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT {Token}</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "PermissionError",
            "description": "<p>Token don`t have permission</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Invalid Token</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "NotFound",
            "description": "<p>List is empty</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/identity/routers/profile/users.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/users",
    "title": "a. Get list of users",
    "name": "GetUsers",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Search by username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Search by Email</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   found: 3,\n   limit: 20,\n   total_pages: 1,\n   current_page: 1,\n   items: []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/identity/routers/profile/users.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/users",
    "title": "b. Create User",
    "name": "PostUsers",
    "group": "Users",
    "parameter": {
      "fields": {
        "Body x-www": [
          {
            "group": "Body x-www",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Username, used in profile label [min 3 max 30]</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email, used in auth [email]</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password, will be encrypted</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": true,
            "field": "fullname",
            "description": "<p>Fullname</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": true,
            "field": "phone",
            "description": "<p>Phone number</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": true,
            "field": "company",
            "description": "<p>Company</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": true,
            "field": "avatar",
            "description": "<p>Avatar</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": true,
            "field": "job",
            "description": "<p>Job</p>"
          },
          {
            "group": "Body x-www",
            "type": "Object",
            "optional": true,
            "field": "country",
            "description": "<p>Country and state</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": true,
            "field": "city",
            "description": "<p>City</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": true,
            "field": "address",
            "description": "<p>Address</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Incorrect fields</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n   _id: (String)\n   created_at: (Datetime)\n   updated_at: (Datetime)\n   roles: []\n   owner: []\n   _links: {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/identity/routers/profile/users.js",
    "groupTitle": "Users"
  },
  {
    "type": "put",
    "url": "/users/upload",
    "title": "d. Upload file in local server (used only local upload is enabled)",
    "name": "PutUploadUsers",
    "group": "Users",
    "parameter": {
      "fields": {
        "params": [
          {
            "group": "params",
            "type": "String",
            "optional": false,
            "field": "ext",
            "description": "<p>Used to construct url</p>"
          },
          {
            "group": "params",
            "type": "String",
            "optional": false,
            "field": "folder",
            "description": "<p>Mark a group folder, that file will be upload (users, teams or company)</p>"
          }
        ],
        "Body x-www": [
          {
            "group": "Body x-www",
            "type": "Resource",
            "optional": false,
            "field": "filetype",
            "description": "<p>Resource filetype to upload.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "JWT (Read | Write | Admin)"
      }
    ],
    "header": {
      "fields": {
        "Auth": [
          {
            "group": "Auth",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT {Token}</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "PermissionError",
            "description": "<p>Token don`t have permission</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Invalid Token</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "NotFound",
            "description": "<p>List is empty</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/identity/routers/profile/users.js",
    "groupTitle": "Users"
  }
] });