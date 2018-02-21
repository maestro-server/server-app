define({ "api": [
  {
    "type": "delete",
    "url": "/events/:id/roles/:idu",
    "title": "l. Delete one role",
    "name": "DeleteRoleEvents",
    "group": "Events",
    "description": "<p>Delete unique role.</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Event unique id.</p>"
          },
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "idu",
            "description": "<p>User unique id.</p>"
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
    "filename": "app/reports/routers/events/events.js",
    "groupTitle": "Events"
  },
  {
    "type": "delete",
    "url": "/events/:id",
    "title": "g. Delete single event",
    "name": "DeleteSingleEvents",
    "group": "Events",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Event unique id.</p>"
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
    "filename": "app/reports/routers/events/events.js",
    "groupTitle": "Events"
  },
  {
    "type": "get",
    "url": "/events/:id",
    "title": "c. Get single event",
    "name": "Get_single_event_",
    "group": "Events",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Event unique id.</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n   _id: (String)\n   created_at: (Datetime)\n   updated_at: (Datetime)\n   roles: []\n   owner: []\n   _links: {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/reports/routers/events/events.js",
    "groupTitle": "Events"
  },
  {
    "type": "get",
    "url": "/events/count",
    "title": "b. Count total events",
    "name": "Get_total_events_",
    "group": "Events",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>Filter by name (Exacly).</p>"
          },
          {
            "group": "Param",
            "type": "String",
            "optional": true,
            "field": "field",
            "description": "<p>Filter by exacly value.</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n   count: (Number)\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/reports/routers/events/events.js",
    "groupTitle": "Events"
  },
  {
    "type": "get",
    "url": "/events",
    "title": "a. List your event",
    "name": "List_all_active_event__have_a_posibility_to_use_filters__pagination__queries_and_etc_",
    "group": "Events",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "Json",
            "optional": true,
            "field": "query",
            "description": "<p>Create a query to filters, the fields received some transformation. <br/></p> <pre class=\"prettyprint language-json\" data-type=\"json\"> <code>{ <br/>   \"name\": 'search by name' <br/>}  </code> </pre> <p><br/><b>Event don´t have modifications, only default regex filter:</b> <br/><i>{alias} = {query into mongodb}</i></p> <ul>     <li>field is string the querie execute a regex research like \"%filter%\", EX: {'name': 'serv'}, It will return result with name 'services58' or '754services'.</li> </ul>"
          },
          {
            "group": "Param",
            "type": "String",
            "optional": true,
            "field": "limit",
            "defaultValue": "20",
            "description": "<p>Limit result.</p>"
          },
          {
            "group": "Param",
            "type": "String",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>Show result by page.</p>"
          },
          {
            "group": "Param",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>Filter by name (Exacly).</p>"
          },
          {
            "group": "Param",
            "type": "String",
            "optional": true,
            "field": "status",
            "description": "<p>Filter by status (success, error, process, warning).</p>"
          },
          {
            "group": "Param",
            "type": "String",
            "optional": true,
            "field": "context",
            "description": "<p>Filter by context</p>"
          },
          {
            "group": "Param",
            "type": "String",
            "optional": true,
            "field": "field",
            "description": "<p>Filter by any field with exacly value.</p>"
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
    "filename": "app/reports/routers/events/events.js",
    "groupTitle": "Events"
  },
  {
    "type": "put",
    "url": "/events/:id",
    "title": "f. Full Update event",
    "name": "PatchSingleEvents",
    "group": "Events",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Event unique id.</p>"
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
            "field": "ValidationError",
            "description": "<p>Incorrect fields</p>"
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
          "content": "HTTP/1.1 202 OK\n{\n   _id: (String)\n   fields: {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/reports/routers/events/events.js",
    "groupTitle": "Events"
  },
  {
    "type": "post",
    "url": "/events/",
    "title": "d. Create single event",
    "name": "PostEvents",
    "group": "Events",
    "parameter": {
      "fields": {
        "Body x-www": [
          {
            "group": "Body x-www",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name [min 3, max 30]</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": true,
            "field": "msg",
            "description": "<p>Description</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": true,
            "field": "status",
            "description": "<p>Status (success, error, warning, process)</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": true,
            "field": "context",
            "description": "<p>The  context event (scheduler, playbook, jobs) <br/></p> <pre class=\"prettyprint language-json\" data-type=\"json\"> <code>[{ <br/>   \"name\": (String), <br/>   \"email\": (String), <br/>   \"role\": (Number), //'1 | 3 | 7' <br/>   \"id\": (String), <br/>   \"refs\": (String) <br/>}]  </code> </pre>"
          },
          {
            "group": "Body x-www",
            "type": "Array",
            "optional": true,
            "field": "check",
            "description": "<p>Spec information <br/></p> <pre class=\"prettyprint language-json\" data-type=\"json\"> <code>[{ <br/>   \"key\": (String), <br/>   \"value\": (String) <br/>}]  </code> </pre>"
          },
          {
            "group": "Body x-www",
            "type": "Array",
            "optional": true,
            "field": "tags",
            "description": "<p>List of tags, [Array of Objects] <br/></p> <pre class=\"prettyprint language-json\" data-type=\"json\"> <code>[{ <br/>   \"key\": (String), <br/>   \"value\": (String) <br/>}]  </code> </pre>"
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
            "field": "ValidationError",
            "description": "<p>Incorrect fields</p>"
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
          "content": "HTTP/1.1 201 OK\n{\n   _id: (String)\n   created_at: (Datetime)\n   updated_at: (Datetime)\n   roles: []\n   owner: []\n   _links: {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/reports/routers/events/events.js",
    "groupTitle": "Events"
  },
  {
    "type": "post",
    "url": "/events/:id/roles/",
    "title": "h. Add access Role",
    "name": "PostRoleEvents",
    "group": "Events",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Application unique id.</p>"
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
          "content": "HTTP/1.1 201 OK\n{}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/reports/routers/events/events.js",
    "groupTitle": "Events"
  },
  {
    "type": "put",
    "url": "/events/:id/roles",
    "title": "i. Update access role",
    "name": "PutRoleEvents",
    "group": "Events",
    "description": "<p>Update all access roles, remember if you don´t send your access, after success you lose the access it´s</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Event unique id.</p>"
          }
        ],
        "Body Raw": [
          {
            "group": "Body Raw",
            "type": "Array",
            "optional": false,
            "field": "raw",
            "description": "<p>List with all roles <br/></p> <pre class=\"prettyprint language-json\" data-type=\"json\"> <code>[{ <br/>   \"name\": (String), <br/>   \"email\": (String), <br/>   \"role\": (Number), //'1 | 3 | 7' <br/>   \"id\": (String), <br/>   \"refs\": (String) <br/>}]  </code> </pre>"
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
          "content": "HTTP/1.1 202 OK\n{}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/reports/routers/events/events.js",
    "groupTitle": "Events"
  },
  {
    "type": "patch",
    "url": "/events/:id",
    "title": "e. Update event",
    "name": "PutSingleEvents",
    "group": "Events",
    "description": "<p>Use patch to partial update.</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Event unique id.</p>"
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
            "field": "ValidationError",
            "description": "<p>Incorrect fields</p>"
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
          "content": "HTTP/1.1 202 OK\n{\n   _id: (String)\n   created_at: (Datetime)\n   updated_at: (Datetime)\n   fields: (Mixed)\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/reports/routers/events/events.js",
    "groupTitle": "Events"
  },
  {
    "type": "put",
    "url": "/events/:id/roles/:idu",
    "title": "j. Update specific access role",
    "name": "PutSingleRoleEvents",
    "group": "Events",
    "description": "<p>Update access level one role to one application</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Event unique id.</p>"
          },
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "idu",
            "description": "<p>User unique id.</p>"
          }
        ],
        "Body x-www": [
          {
            "group": "Body x-www",
            "type": "String",
            "optional": false,
            "field": "field",
            "description": "<p>Any field describe to create role</p>"
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
          "content": "HTTP/1.1 202 OK\n{}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/reports/routers/events/events.js",
    "groupTitle": "Events"
  },
  {
    "type": "delete",
    "url": "/reports/:id/roles/:idu",
    "title": "l. Delete one role",
    "name": "DeleteRoleReports",
    "group": "Reports",
    "description": "<p>Delete unique role.</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Report unique id.</p>"
          },
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "idu",
            "description": "<p>User unique id.</p>"
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
    "filename": "app/reports/routers/reports/reports.js",
    "groupTitle": "Reports"
  },
  {
    "type": "delete",
    "url": "/reports/:id",
    "title": "g. Delete single report",
    "name": "DeleteSingleReports",
    "group": "Reports",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Report unique id.</p>"
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
    "filename": "app/reports/routers/reports/reports.js",
    "groupTitle": "Reports"
  },
  {
    "type": "get",
    "url": "/reports/:id/result",
    "title": "d. Get report result",
    "name": "Get_report_result_",
    "group": "Reports",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Report unique id.</p>"
          },
          {
            "group": "Param",
            "type": "String",
            "optional": true,
            "field": "limit",
            "defaultValue": "20",
            "description": "<p>Limit result.</p>"
          },
          {
            "group": "Param",
            "type": "String",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>Show result by page.</p>"
          },
          {
            "group": "Param",
            "type": "Object",
            "optional": true,
            "field": "field",
            "description": "<p>Filter with any field and value.</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n   _id: (String)\n   created_at: (Datetime)\n   updated_at: (Datetime)\n   roles: []\n   owner: []\n   _links: {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/reports/routers/reports/reports.js",
    "groupTitle": "Reports"
  },
  {
    "type": "get",
    "url": "/reports/:id",
    "title": "c. Get single report",
    "name": "Get_single_report_",
    "group": "Reports",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Report unique id.</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n   _id: (String)\n   created_at: (Datetime)\n   updated_at: (Datetime)\n   roles: []\n   owner: []\n   _links: {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/reports/routers/reports/reports.js",
    "groupTitle": "Reports"
  },
  {
    "type": "get",
    "url": "/reports/count",
    "title": "b. Count total reports",
    "name": "Get_total_reports_",
    "group": "Reports",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>Filter by name (Exacly).</p>"
          },
          {
            "group": "Param",
            "type": "String",
            "optional": true,
            "field": "field",
            "description": "<p>Filter by exacly value.</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n   count: (Number)\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/reports/routers/reports/reports.js",
    "groupTitle": "Reports"
  },
  {
    "type": "get",
    "url": "/reports",
    "title": "a. List your reports",
    "name": "List_all_active_reports__have_a_posibility_to_use_filters__pagination__queries_and_etc_",
    "group": "Reports",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "Json",
            "optional": true,
            "field": "query",
            "description": "<p>Create a query to filters, the fields received some transformation. <br/></p> <pre class=\"prettyprint language-json\" data-type=\"json\"> <code>{ <br/>   \"name\": 'search by name' <br/>}  </code> </pre> <p><br/><b>Reports don´t have modifications, only default regex filter:</b> <br/><i>{alias} = {query into mongodb}</i></p> <ul>     <li>field is string the querie execute a regex research like \"%filter%\", EX: {'name': 'serv'}, It will return result with name 'services58' or '754services'.</li> </ul>"
          },
          {
            "group": "Param",
            "type": "String",
            "optional": true,
            "field": "limit",
            "defaultValue": "20",
            "description": "<p>Limit result.</p>"
          },
          {
            "group": "Param",
            "type": "String",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>Show result by page.</p>"
          },
          {
            "group": "Param",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>Filter by name (Exacly).</p>"
          },
          {
            "group": "Param",
            "type": "String",
            "optional": true,
            "field": "component",
            "description": "<p>Component name (Server, Application, Databases, LoadBalances, etc).</p>"
          },
          {
            "group": "Param",
            "type": "String",
            "optional": true,
            "field": "status",
            "description": "<p>Filter by status (process, finished, error).</p>"
          },
          {
            "group": "Param",
            "type": "String",
            "optional": true,
            "field": "report",
            "description": "<p>Report category (general, pivot).</p>"
          },
          {
            "group": "Param",
            "type": "String",
            "optional": true,
            "field": "field",
            "description": "<p>Filter by any field with exacly value.</p>"
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
    "filename": "app/reports/routers/reports/reports.js",
    "groupTitle": "Reports"
  },
  {
    "type": "put",
    "url": "/reports/:id",
    "title": "f. Full Update report",
    "name": "PatchSingleReports",
    "group": "Reports",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Report unique id.</p>"
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
            "field": "ValidationError",
            "description": "<p>Incorrect fields</p>"
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
          "content": "HTTP/1.1 202 OK\n{\n   _id: (String)\n   fields: {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/reports/routers/reports/reports.js",
    "groupTitle": "Reports"
  },
  {
    "type": "post",
    "url": "/reports/",
    "title": "d. Create single report",
    "name": "PostReports",
    "group": "Reports",
    "parameter": {
      "fields": {
        "Body x-www": [
          {
            "group": "Body x-www",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name [min 3, max 30]</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>Description</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": false,
            "field": "component",
            "description": "<p>Component name [min 3, max 30]</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": false,
            "field": "report",
            "description": "<p>Report category (pivot, general)</p>"
          },
          {
            "group": "Body x-www",
            "type": "Array",
            "optional": true,
            "field": "columns",
            "description": "<p>List of columns mapped, used to create view report.</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": true,
            "field": "filters",
            "description": "<p>Filters used to generate result</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": true,
            "field": "msg",
            "description": "<p>Foreign id table, used to link with other db collection table</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": true,
            "field": "status",
            "description": "<p>Status (finished, process, error)</p>"
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
            "field": "ValidationError",
            "description": "<p>Incorrect fields</p>"
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
          "content": "HTTP/1.1 201 OK\n{\n   _id: (String)\n   created_at: (Datetime)\n   updated_at: (Datetime)\n   roles: []\n   owner: []\n   _links: {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/reports/routers/reports/reports.js",
    "groupTitle": "Reports"
  },
  {
    "type": "post",
    "url": "/reports/:id/roles/",
    "title": "h. Add access Role",
    "name": "PostRoleReports",
    "group": "Reports",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Report unique id.</p>"
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
          "content": "HTTP/1.1 201 OK\n{}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/reports/routers/reports/reports.js",
    "groupTitle": "Reports"
  },
  {
    "type": "put",
    "url": "/reports/:id/roles",
    "title": "i. Update access role",
    "name": "PutRoleReports",
    "group": "Reports",
    "description": "<p>Update all access roles, remember if you don´t send your access, after success you lose the access it´s</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Report unique id.</p>"
          }
        ],
        "Body Raw": [
          {
            "group": "Body Raw",
            "type": "Array",
            "optional": false,
            "field": "raw",
            "description": "<p>List with all roles <br/></p> <pre class=\"prettyprint language-json\" data-type=\"json\"> <code>[{ <br/>   \"name\": (String), <br/>   \"email\": (String), <br/>   \"role\": (Number), //'1 | 3 | 7' <br/>   \"id\": (String), <br/>   \"refs\": (String) <br/>}]  </code> </pre>"
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
          "content": "HTTP/1.1 202 OK\n{}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/reports/routers/reports/reports.js",
    "groupTitle": "Reports"
  },
  {
    "type": "patch",
    "url": "/reports/:id",
    "title": "e. Update report",
    "name": "PutSingleReports",
    "group": "Reports",
    "description": "<p>Use patch to partial update.</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Report unique id.</p>"
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
            "field": "ValidationError",
            "description": "<p>Incorrect fields</p>"
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
          "content": "HTTP/1.1 202 OK\n{\n   _id: (String)\n   created_at: (Datetime)\n   updated_at: (Datetime)\n   fields: (Mixed)\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/reports/routers/reports/reports.js",
    "groupTitle": "Reports"
  },
  {
    "type": "put",
    "url": "/reports/:id/roles/:idu",
    "title": "j. Update specific access role",
    "name": "PutSingleRoleReports",
    "group": "Reports",
    "description": "<p>Update access level one role to one report</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Report unique id.</p>"
          },
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "idu",
            "description": "<p>User unique id.</p>"
          }
        ],
        "Body x-www": [
          {
            "group": "Body x-www",
            "type": "String",
            "optional": false,
            "field": "field",
            "description": "<p>Any field describe to create role</p>"
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
          "content": "HTTP/1.1 202 OK\n{}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/reports/routers/reports/reports.js",
    "groupTitle": "Reports"
  },
  {
    "type": "delete",
    "url": "/teams/:id/events/:idu",
    "title": "sf. Single events for Team",
    "name": "DeleteSingleListEventsTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/reports/routers/events/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "delete",
    "url": "/teams/:id/reports/:idu",
    "title": "sf. Single reports for Team",
    "name": "DeleteSingleListReportsTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/reports/routers/reports/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/teams/:id/events/count",
    "title": "sb. Count events for Team",
    "name": "GetCountListEventsTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/reports/routers/events/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/teams/:id/reports/count",
    "title": "sb. Count reports for Team",
    "name": "GetCountListReportsTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/reports/routers/reports/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/teams/:id/events",
    "title": "sa. List events for Team",
    "name": "GetListEvents",
    "group": "Teams",
    "description": "<p>Use for teams scope, have be all actions, params and option in /clients,</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Team unique ID.</p>"
          },
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "idu",
            "description": "<p>Server unique ID.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/reports/routers/events/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/teams/:id/reports",
    "title": "sa. List reports for Team",
    "name": "GetListReports",
    "group": "Teams",
    "description": "<p>Use for teams scope, have be all actions, params and option in /clients,</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Team unique ID.</p>"
          },
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "idu",
            "description": "<p>Server unique ID.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/reports/routers/reports/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "patch",
    "url": "/teams/:id/events/:idu",
    "title": "se. Partial events for Team",
    "name": "GetPartialSingleListEventsTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/reports/routers/events/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "patch",
    "url": "/teams/:id/reports/:idu",
    "title": "se. Partial reports for Team",
    "name": "GetPartialSingleListReportsTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/reports/routers/reports/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "delete",
    "url": "/teams/:id/events/:idu/roles/:ida",
    "title": "sl. Delete access role",
    "name": "GetSingleListEventsTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/reports/routers/events/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "post",
    "url": "/teams/:id/events/:idu/roles",
    "title": "sh. Create access role",
    "name": "GetSingleListEventsTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/reports/routers/events/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "put",
    "url": "/teams/:id/events/:idu/roles",
    "title": "si. Update all access role",
    "name": "GetSingleListEventsTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/reports/routers/events/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "put",
    "url": "/teams/:id/events/:idu/roles/:ida",
    "title": "sj. Update access role",
    "name": "GetSingleListEventsTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/reports/routers/events/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "delete",
    "url": "/teams/:id/reports/:idu/roles/:ida",
    "title": "sl. Delete access role",
    "name": "GetSingleListReportsTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/reports/routers/reports/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "post",
    "url": "/teams/:id/reports/:idu/roles",
    "title": "sh. Create access role",
    "name": "GetSingleListReportsTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/reports/routers/reports/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "put",
    "url": "/teams/:id/reports/:idu/roles",
    "title": "si. Update all access role",
    "name": "GetSingleListReportsTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/reports/routers/reports/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "put",
    "url": "/teams/:id/reports/:idu/roles/:ida",
    "title": "sj. Update access role",
    "name": "GetSingleListReportsTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/reports/routers/reports/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/teams/:id/events/:idu",
    "title": "sc. Single events for Team",
    "name": "GetSingleListeventsTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/reports/routers/events/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/teams/:id/reports/:idu",
    "title": "sc. Single reports for Team",
    "name": "GetSingleListreportsTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/reports/routers/reports/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "post",
    "url": "/teams/:id/events/",
    "title": "sg. Create events for Team",
    "name": "PostSingleListEventsTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/reports/routers/events/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "post",
    "url": "/teams/:id/reports/",
    "title": "sg. Create reports for Team",
    "name": "PostSingleListReportsTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/reports/routers/reports/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "put",
    "url": "/teams/:id/events/:idu",
    "title": "sd. Update all events for Team",
    "name": "UpdateSingleListeventsTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/reports/routers/events/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "put",
    "url": "/teams/:id/reports/:idu",
    "title": "sd. Update all reports for Team",
    "name": "UpdateSingleListreportsTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/reports/routers/reports/index.js",
    "groupTitle": "Teams"
  }
] });
