define({ "api": [
  {
    "type": "get",
    "url": "/adminer",
    "title": "a. List your adminer",
    "name": "GetAdminer",
    "group": "Adminer",
    "parameter": {
      "fields": {
        "Param": [
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
            "field": "key",
            "description": "<p>Filter by key (like servers-options).</p>"
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
    "filename": "app/adminer/routers/adminer.js",
    "groupTitle": "Adminer"
  },
  {
    "type": "get",
    "url": "/adminer/:id",
    "title": "c. Get single adminer",
    "name": "GetSingleAdminer",
    "group": "Adminer",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Adminer unique id.</p>"
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
    "filename": "app/adminer/routers/adminer.js",
    "groupTitle": "Adminer"
  },
  {
    "type": "patch",
    "url": "/adminer/:id",
    "title": "e. Update adminer",
    "name": "PutSingleAdminer",
    "group": "Adminer",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Adminer unique id.</p>"
          }
        ],
        "Body x-www": [
          {
            "group": "Body x-www",
            "type": "Object",
            "optional": false,
            "field": "key",
            "description": "<p>Key name [min 3, max 150]</p>"
          },
          {
            "group": "Body x-www",
            "type": "Aray",
            "optional": true,
            "field": "value",
            "description": "<p>List of value [Array of objects]</p>"
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
    "filename": "app/adminer/routers/adminer.js",
    "groupTitle": "Adminer"
  },
  {
    "type": "delete",
    "url": "/services/:id",
    "title": "g. Delete single service",
    "name": "DeleteSingleService",
    "group": "Services",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Service unique id.</p>"
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
    "filename": "app/adminer/routers/services.js",
    "groupTitle": "Services"
  },
  {
    "type": "get",
    "url": "/services/count",
    "title": "b. Count total services",
    "name": "GetCountService",
    "group": "Services",
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
    "filename": "app/adminer/routers/services.js",
    "groupTitle": "Services"
  },
  {
    "type": "get",
    "url": "/services",
    "title": "a. List your services",
    "name": "GetService",
    "group": "Services",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "Json",
            "optional": true,
            "field": "query",
            "description": "<p>Create a query to filters, the fields received some transformation. <br/></p> <pre class=\"prettyprint language-json\" data-type=\"json\"> <code>{ <br/>   \"name\": 'search by name' <br/>}  </code> </pre> <p><br/><b>Services don´t have modifications, only default regex filter:</b> <br/><i>{alias} = {query into mongodb}</i></p> <ul>     <li>field is string the querie execute a regex research like \"%filter%\", EX: {'name': 'serv'}, It will return result with name 'services58' or '754services'.</li> </ul>"
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
    "filename": "app/adminer/routers/services.js",
    "groupTitle": "Services"
  },
  {
    "type": "get",
    "url": "/services/:id",
    "title": "c. Get single service",
    "name": "GetSingleService",
    "group": "Services",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Service unique id.</p>"
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
    "filename": "app/adminer/routers/services.js",
    "groupTitle": "Services"
  },
  {
    "type": "put",
    "url": "/services/:id",
    "title": "f. Full Update services",
    "name": "PatchSingleService",
    "group": "Services",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Service unique id.</p>"
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
    "filename": "app/adminer/routers/services.js",
    "groupTitle": "Services"
  },
  {
    "type": "post",
    "url": "/services/",
    "title": "d. Create single service",
    "name": "PostServices",
    "group": "Services",
    "parameter": {
      "fields": {
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
            "optional": true,
            "field": "family",
            "description": "<p>Api Name [min 3, max 150]</p>"
          },
          {
            "group": "Body x-www",
            "type": "Array",
            "optional": true,
            "field": "tags",
            "description": "<p>List of tags, this tags is different in comparer to outhers [Array of String]</p>"
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
    "filename": "app/adminer/routers/services.js",
    "groupTitle": "Services"
  },
  {
    "type": "patch",
    "url": "/services/:id",
    "title": "e. Update services",
    "name": "PutSingleService",
    "group": "Services",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Service unique id.</p>"
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
    "filename": "app/adminer/routers/services.js",
    "groupTitle": "Services"
  }
] });