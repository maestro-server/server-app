define({ "api": [
  {
    "type": "delete",
    "url": "/applications/:id/roles/:idu",
    "title": "l. Delete one role",
    "name": "DeleteRoleApp",
    "group": "Applications",
    "description": "<p>Delete unique role.</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Application unique id.</p>"
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
    "filename": "app/inventory/routers/applications/applications.js",
    "groupTitle": "Applications"
  },
  {
    "type": "delete",
    "url": "/applications/:id",
    "title": "g. Delete single app",
    "name": "DeleteSingleApplication",
    "group": "Applications",
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
    "filename": "app/inventory/routers/applications/applications.js",
    "groupTitle": "Applications"
  },
  {
    "type": "get",
    "url": "/applications",
    "title": "a. List your applications",
    "name": "GetApplication",
    "group": "Applications",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "Json",
            "optional": true,
            "field": "query",
            "description": "<p>Create a query to filters, the fields received some transformation. <br/></p> <pre class=\"prettyprint language-json\" data-type=\"json\"> <code>{ <br/>   \"name\": 'search by name', <br/>   \"lsysem\": 'search by system name' <br/>}  </code> </pre> <p><br/><b>The list modification is:</b> <br/><i>{alias} = {query into mongodb}</i></p> <ul>     <li>lsystem = system.name</li>     <li>role = role.role</li>     <li>language = upperCase(language)</li>     <li>provider = upperCase(language)</li>     <li>environment = upperCase(language)</li>     <li>field is string the querie execute a regex research like \"%filter%\", EX: {'name': 'serv'}, It will return applications with name 'services58' or '754services'.</li> </ul>"
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
            "field": "servers",
            "description": "<p>Filters by id server.</p>"
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
    "filename": "app/inventory/routers/applications/applications.js",
    "groupTitle": "Applications"
  },
  {
    "type": "get",
    "url": "/applications/count",
    "title": "b. Count total apps",
    "name": "GetCountApplication",
    "group": "Applications",
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
            "field": "servers",
            "description": "<p>Filters by id server.</p>"
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
    "filename": "app/inventory/routers/applications/applications.js",
    "groupTitle": "Applications"
  },
  {
    "type": "get",
    "url": "/applications/:id",
    "title": "c. Get single app",
    "name": "GetSingleApplication",
    "group": "Applications",
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
          "content": "HTTP/1.1 200 OK\n{\n   _id: (String)\n   created_at: (Datetime)\n   updated_at: (Datetime)\n   roles: []\n   owner: []\n   _links: {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/inventory/routers/applications/applications.js",
    "groupTitle": "Applications"
  },
  {
    "type": "put",
    "url": "/applications/:id",
    "title": "f. Full Update app",
    "name": "PatchSingleApplication",
    "group": "Applications",
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
    "filename": "app/inventory/routers/applications/applications.js",
    "groupTitle": "Applications"
  },
  {
    "type": "post",
    "url": "/applications/",
    "title": "d. Create single app",
    "name": "PostApplication",
    "group": "Applications",
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
            "field": "description",
            "description": "<p>Short description [max 800]</p>"
          },
          {
            "group": "Body x-www",
            "type": "Array",
            "optional": true,
            "field": "servers",
            "description": "<p>List of ids servers [Array of Ids]</p>"
          },
          {
            "group": "Body x-www",
            "type": "Array",
            "optional": true,
            "field": "targets",
            "description": "<p>List of ids servers [Array of Ids]</p>"
          },
          {
            "group": "Body x-www",
            "type": "Boolean",
            "optional": true,
            "field": "own",
            "defaultValue": "0",
            "description": "<p>Resposability, 0 = Service installed in own servers, 1 - Third service</p>"
          },
          {
            "group": "Body x-www",
            "type": "Object",
            "optional": false,
            "field": "role",
            "description": "<p>Specification <br/></p> <pre class=\"prettyprint language-json\" data-type=\"json\"> <code>\"role\": { <br/>   \"role\": (String), //'Application, Worker, Job, testing, Standard' <br/>   \"endpoint\": (String), <br/>   \"command\": (String), //'this app needs a command to start' <br/>   \"path\": (String), //'location' <br/>   \"description\": (String) <br/>}  </code> </pre>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": true,
            "field": "language",
            "description": "<p>Language, used only in Bussiness Application [NodeJs, Java, Python and etc]</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": true,
            "field": "provider",
            "description": "<p>Service name [ELB, Google Cloud Containers, etc]</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": true,
            "field": "cluster",
            "description": "<p>If this app run in cluster (No, Master/Slave, 12 Factor, ZooKeeper, Leader election)</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": true,
            "field": "dataguard",
            "description": "<p>Used only for Oracle DB. Type of dataguard</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": true,
            "field": "storage_types",
            "description": "<p>Used only for Oracle DB. How Oracle DB manage space in disk</p>"
          },
          {
            "group": "Body x-www",
            "type": "Array",
            "optional": true,
            "field": "asm_groups",
            "description": "<p>Used only for Oracle DB. If use ASM, name of groups. [Array of strings]</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": true,
            "field": "pdbs",
            "description": "<p>Used only for Oracle DB. If use Containers DB. [Array of strings]</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": true,
            "field": "crs_version",
            "description": "<p>Used only for Oracle DB.</p>"
          },
          {
            "group": "Body x-www",
            "type": "Object",
            "optional": true,
            "field": "deploy",
            "description": "<p>Deploy methods: <br/></p> <pre class=\"prettyprint language-json\" data-type=\"json\"> <code>\"deploy\": { <br/>   \"type\": (String), //'GIT, FTP, Etc' <br/>   \"provider\": (String), //'Github, BitBucket' <br/>   \"notes\": (String) <br/>}  </code> </pre>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": true,
            "field": "type",
            "description": "<p>Type of application [min 3, max 150]</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": true,
            "field": "modal",
            "description": "<p>use only in Databases, especificy database [oracle, mysql, postgres, etc] [max 30]</p>"
          },
          {
            "group": "Body x-www",
            "type": "Array",
            "optional": true,
            "field": "tags",
            "description": "<p>List of tags, [Array of Objects] <br/></p> <pre class=\"prettyprint language-json\" data-type=\"json\"> <code>[{ <br/>   \"key\": (String), <br/>   \"value\": (String) <br/>}]  </code> </pre>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": true,
            "field": "unique_id",
            "description": "<p>Unique name, normally use in Databases</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": true,
            "field": "status",
            "description": "<p>Status, [Active, Avaliable, Stopped]</p>"
          },
          {
            "group": "Body x-www",
            "type": "Object",
            "optional": true,
            "field": "datacenters",
            "description": "<p>Datacenter, normally used in third services <br/></p> <pre class=\"prettyprint language-json\" data-type=\"json\"> <code>{ <br/>   \"_id\": (String), <br/>   \"provider\": (String), <br/>   \"name\": (String) <br/>}  </code> </pre>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": true,
            "field": "environment",
            "description": "<p>Envronment, ['Production', 'Staging', 'Development', 'UTA', 'Training', 'SandBox']</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": true,
            "field": "family",
            "defaultValue": "Application",
            "description": "<p>Family, ['Application', 'Loadbalance', 'Broker', 'Database', 'Serverless', 'Serveless', 'ApiGateway', 'ContainerOrchestration', 'Cache', 'CDN', 'ObjectStorage', 'Monitor', 'Logs', 'SMTP', 'ServiceDiscovery', 'VPN', 'CI/CD', 'DNS', 'Repository', 'Auth', 'NAS']</p>"
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
    "filename": "app/inventory/routers/applications/applications.js",
    "groupTitle": "Applications"
  },
  {
    "type": "post",
    "url": "/applications/:id/roles/",
    "title": "h. Add access Role",
    "name": "PostRoleApp",
    "group": "Applications",
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
    "filename": "app/inventory/routers/applications/applications.js",
    "groupTitle": "Applications"
  },
  {
    "type": "put",
    "url": "/applications/:id/roles",
    "title": "i. Update access role",
    "name": "PutRoleApp",
    "group": "Applications",
    "description": "<p>Update all access roles, remember if you don´t send your access, after success you lose the access it´s</p>",
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
    "filename": "app/inventory/routers/applications/applications.js",
    "groupTitle": "Applications"
  },
  {
    "type": "patch",
    "url": "/applications/:id",
    "title": "e. Update app",
    "name": "PutSingleApplication",
    "group": "Applications",
    "description": "<p>Use patch to partial update.</p>",
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
    "filename": "app/inventory/routers/applications/applications.js",
    "groupTitle": "Applications"
  },
  {
    "type": "put",
    "url": "/applications/:id/roles/:idu",
    "title": "j. Update specific access role",
    "name": "PutSingleRoleApp",
    "group": "Applications",
    "description": "<p>Update access level one role to one application</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Application unique id.</p>"
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
    "filename": "app/inventory/routers/applications/applications.js",
    "groupTitle": "Applications"
  },
  {
    "type": "get",
    "url": "/clients/:id/system",
    "title": "n. Delete system into client",
    "name": "DeleteClientSystem",
    "group": "Clients",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Client unique id.</p>"
          }
        ],
        "www-body": [
          {
            "group": "www-body",
            "type": "Array",
            "optional": false,
            "field": "id",
            "description": "<p>List of system ids [Array of strings].</p>"
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
    "filename": "app/inventory/routers/clients/clients.js",
    "groupTitle": "Clients"
  },
  {
    "type": "delete",
    "url": "/clients/:id/roles/:idu",
    "title": "l. Delete one role",
    "name": "DeleteRoleClient",
    "group": "Clients",
    "description": "<p>Delete unique role.</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Client unique id.</p>"
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
    "filename": "app/inventory/routers/clients/clients.js",
    "groupTitle": "Clients"
  },
  {
    "type": "delete",
    "url": "/clients/:id",
    "title": "g. Delete single client",
    "name": "DeleteSingleClients",
    "group": "Clients",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Client unique id.</p>"
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
    "filename": "app/inventory/routers/clients/clients.js",
    "groupTitle": "Clients"
  },
  {
    "type": "get",
    "url": "/clients",
    "title": "a. List your clients",
    "name": "GetClient",
    "group": "Clients",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "Json",
            "optional": true,
            "field": "query",
            "description": "<p>Create a query to filters, the fields received some transformation. <br/></p> <pre class=\"prettyprint language-json\" data-type=\"json\"> <code>{ <br/>   \"name\": 'search by name', <br/>   \"lclient\": 'search by client name' //used in simple flatted querie <br/>}  </code> </pre> <p><br/><b>The list modification is:</b> <br/><i>{alias} = {query into mongodb}</i></p> <ul>     <li>lclient = clients.name</li>     <li>contacts = upperCase(contacts)</li>     <li>field is string the querie execute a regex research like \"%filter%\", EX: {'name': 'serv'}, It will return clients with name 'services58' or '754services'.</li> </ul>"
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
    "filename": "app/inventory/routers/clients/clients.js",
    "groupTitle": "Clients"
  },
  {
    "type": "get",
    "url": "/clients/count",
    "title": "b. Count total clients",
    "name": "GetCountClient",
    "group": "Clients",
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
    "filename": "app/inventory/routers/clients/clients.js",
    "groupTitle": "Clients"
  },
  {
    "type": "get",
    "url": "/clients/:id",
    "title": "c. Get single client",
    "name": "GetSingleClient",
    "group": "Clients",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Client unique id.</p>"
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
    "filename": "app/inventory/routers/clients/clients.js",
    "groupTitle": "Clients"
  },
  {
    "type": "patch",
    "url": "/clients/:id/system",
    "title": "m. Add system into client",
    "name": "PatchClientSystem",
    "group": "Clients",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Client unique id.</p>"
          }
        ],
        "www-body": [
          {
            "group": "www-body",
            "type": "Array",
            "optional": false,
            "field": "id",
            "description": "<p>List of system ids [Array of strings].</p>"
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
    "filename": "app/inventory/routers/clients/clients.js",
    "groupTitle": "Clients"
  },
  {
    "type": "put",
    "url": "/clients/:id",
    "title": "f. Full Update client",
    "name": "PatchSingleClients",
    "group": "Clients",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Client unique id.</p>"
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
    "filename": "app/inventory/routers/clients/clients.js",
    "groupTitle": "Clients"
  },
  {
    "type": "post",
    "url": "/clients/",
    "title": "d. Create single client",
    "name": "PostClients",
    "group": "Clients",
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
            "field": "description",
            "description": "<p>Short description [max 800]</p>"
          },
          {
            "group": "Body x-www",
            "type": "Array",
            "optional": true,
            "field": "contacts",
            "description": "<p>Contact list <br/></p> <pre class=\"prettyprint language-json\" data-type=\"json\"> <code>[{ <br/>   \"channel\": (String), <br/>   \"value\": (String) <br/>}]  </code> </pre>"
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
    "filename": "app/inventory/routers/clients/clients.js",
    "groupTitle": "Clients"
  },
  {
    "type": "post",
    "url": "/clients/:id/roles/",
    "title": "h. Add access Role",
    "name": "PostRoleClient",
    "group": "Clients",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Client unique id.</p>"
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
    "filename": "app/inventory/routers/clients/clients.js",
    "groupTitle": "Clients"
  },
  {
    "type": "put",
    "url": "/clients/:id/roles",
    "title": "i. Update access role",
    "name": "PutRoleClient",
    "group": "Clients",
    "description": "<p>Update all access roles, remember if you don´t send your access, after success you lose the access it´s</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Client unique id.</p>"
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
    "filename": "app/inventory/routers/clients/clients.js",
    "groupTitle": "Clients"
  },
  {
    "type": "patch",
    "url": "/clients/:id",
    "title": "e. Update client",
    "name": "PutSingleClients",
    "group": "Clients",
    "description": "<p>Use patch to partial update.</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Client unique id.</p>"
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
    "filename": "app/inventory/routers/clients/clients.js",
    "groupTitle": "Clients"
  },
  {
    "type": "put",
    "url": "/clients/:id/roles/:idu",
    "title": "j. Update specific access role",
    "name": "PutSingleRoleClient",
    "group": "Clients",
    "description": "<p>Update access level one role to one application</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Client unique id.</p>"
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
          "content": "HTTP/1.1 202 OK\n{}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/inventory/routers/clients/clients.js",
    "groupTitle": "Clients"
  },
  {
    "type": "delete",
    "url": "/connections/:id/roles/:idu",
    "title": "m. Delete one role",
    "name": "DeleteRoleConnections",
    "group": "Connections",
    "description": "<p>Delete unique role.</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Connection unique id.</p>"
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
    "filename": "app/inventory/routers/connections/connections.js",
    "groupTitle": "Connections"
  },
  {
    "type": "delete",
    "url": "/connections/:id",
    "title": "g. Delete single connection",
    "name": "DeleteSingleConnections",
    "group": "Connections",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Connection unique id.</p>"
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
    "filename": "app/inventory/routers/connections/connections.js",
    "groupTitle": "Connections"
  },
  {
    "type": "get",
    "url": "/connections",
    "title": "a. List your connections",
    "name": "GetConnection",
    "group": "Connections",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "Json",
            "optional": true,
            "field": "query",
            "description": "<p>Create a query to filters, the fields received some transformation. <br/></p> <pre class=\"prettyprint language-json\" data-type=\"json\"> <code>{ <br/>   \"name\": 'search by name', <br/>   \"provider\": 'search by provider name, like (AWS, OpenStack)' <br/>}  </code> </pre> <p><br/><b>Connection don´t have modifications, only default regex filter:</b> <br/><i>{alias} = {query into mongodb}</i></p> <ul>     <li>field is string the querie execute a regex research like \"%filter%\", EX: {'name': 'serv'}, It will return result with name 'services58' or '754services'.</li> </ul>"
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
            "field": "provider",
            "description": "<p>Filters by provider.</p>"
          },
          {
            "group": "Param",
            "type": "String",
            "optional": true,
            "field": "dc_id",
            "description": "<p>Filters by DC Id.</p>"
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
    "filename": "app/inventory/routers/connections/connections.js",
    "groupTitle": "Connections"
  },
  {
    "type": "get",
    "url": "/connections/count",
    "title": "b. Count total connections",
    "name": "GetCountConnection",
    "group": "Connections",
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
            "field": "provider",
            "description": "<p>Filters by provider.</p>"
          },
          {
            "group": "Param",
            "type": "String",
            "optional": true,
            "field": "dc_id",
            "description": "<p>Filters by DC Id.</p>"
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
    "filename": "app/inventory/routers/connections/connections.js",
    "groupTitle": "Connections"
  },
  {
    "type": "get",
    "url": "/connections/:id",
    "title": "c. Get single connection",
    "name": "GetSingleConnection",
    "group": "Connections",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Connections unique id.</p>"
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
    "filename": "app/inventory/routers/connections/connections.js",
    "groupTitle": "Connections"
  },
  {
    "type": "put",
    "url": "/connections/:id",
    "title": "f. Full Update connection",
    "name": "PatchSingleConnections",
    "group": "Connections",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Connection unique id.</p>"
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
    "filename": "app/inventory/routers/connections/connections.js",
    "groupTitle": "Connections"
  },
  {
    "type": "post",
    "url": "/connections/",
    "title": "d. Create single connection",
    "name": "PostConnections",
    "group": "Connections",
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
            "field": "url",
            "description": "<p>Url source, normally used in OpenStack [max 250]</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": true,
            "field": "project",
            "description": "<p>Project name, used in OpenStack [max 250]</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status [Enabled | Disabled]</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": false,
            "field": "dc",
            "description": "<p>Datacenter name [max 150]</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": false,
            "field": "dc_id",
            "description": "<p>Id Dc [ObjectId]</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": false,
            "field": "provider",
            "description": "<p>Provider name (AWS, OpenStack)</p>"
          },
          {
            "group": "Body x-www",
            "type": "Array",
            "optional": false,
            "field": "regions",
            "description": "<p>Regions used for crawler [Array of string]</p>"
          },
          {
            "group": "Body x-www",
            "type": "Object",
            "optional": true,
            "field": "owner_user",
            "description": "<p>Owner user, used for clone owner and roles. <br/></p> <pre class=\"prettyprint language-json\" data-type=\"json\"> <code>{ <br/>   \"name\": (String), <br/>   \"role\": (Number), [1 = read, 3 = write or 7 = admin] <br/>   \"email\": (String), <br/>   \"refs\": (String) [\"users\", \"teams\", \"projects\"] <br/>}  </code> </pre>"
          },
          {
            "group": "Body x-www",
            "type": "Object",
            "optional": true,
            "field": "process",
            "description": "<p>Process logs <br/></p> <pre class=\"prettyprint language-json\" data-type=\"json\"> <code>{ <br/>   \"{key-name}\": { <br/>        state: (String) [success, warning, danger] <br/>        msg:  (String) <br/>    } <br/>}  </code> </pre>"
          },
          {
            "group": "Body x-www",
            "type": "Object",
            "optional": false,
            "field": "conn",
            "description": "<p>Credencials will be transform in JWT, a format object depends provider [beacause of transformation, this field not be updated] <br/></p> <pre class=\"prettyprint language-json\" data-type=\"json\"> <code> <br/> //AWS <br/>{ <br/>   \"access\": (String), <br/>   \"secret\": (String) <br/>} <br/> //OpenStack <br/>{ <br/>   \"username\": (String), <br/>   \"password\": (String) <br/>}  </code> </pre>"
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
    "filename": "app/inventory/routers/connections/connections.js",
    "groupTitle": "Connections"
  },
  {
    "type": "post",
    "url": "/connections/:id/roles/",
    "title": "i. Add access Role",
    "name": "PostRoleConnections",
    "group": "Connections",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Connection unique id.</p>"
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
    "filename": "app/inventory/routers/connections/connections.js",
    "groupTitle": "Connections"
  },
  {
    "type": "put",
    "url": "/connections/:id/roles",
    "title": "j. Update access role",
    "name": "PutRoleConnections",
    "group": "Connections",
    "description": "<p>Update all access roles, remember if you don´t send your access, after success you lose the access it´s</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Connection unique id.</p>"
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
    "filename": "app/inventory/routers/connections/connections.js",
    "groupTitle": "Connections"
  },
  {
    "type": "patch",
    "url": "/connections/:id",
    "title": "e. Update connection",
    "name": "PutSingleConnections",
    "group": "Connections",
    "description": "<p>Use patch to partial update.</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Connection unique id.</p>"
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
    "filename": "app/inventory/routers/connections/connections.js",
    "groupTitle": "Connections"
  },
  {
    "type": "put",
    "url": "/connections/:id/roles/:idu",
    "title": "l. Update specific access role",
    "name": "PutSingleRoleConnections",
    "group": "Connections",
    "description": "<p>Update access level one role to one application</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Connection unique id.</p>"
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
          "content": "HTTP/1.1 202 OK\n{}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/inventory/routers/connections/connections.js",
    "groupTitle": "Connections"
  },
  {
    "type": "put",
    "url": "/:id/task/:command",
    "title": "h. Execute task",
    "name": "PutTaskSingleConnection",
    "group": "Connections",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Connection unique id.</p>"
          },
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "command",
            "description": "<p>Command name [server-list, dbs-list and etc]</p>"
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
    "filename": "app/inventory/routers/connections/connections.js",
    "groupTitle": "Connections"
  },
  {
    "type": "delete",
    "url": "/datacenters/:id/roles/:idu",
    "title": "l. Delete one role",
    "name": "DeleteRoleDatacenters",
    "group": "Datacenters",
    "description": "<p>Delete unique role.</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Datacenter unique id.</p>"
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
    "filename": "app/inventory/routers/datacenters/datacenters.js",
    "groupTitle": "Datacenters"
  },
  {
    "type": "delete",
    "url": "/datacenters/:id",
    "title": "g. Delete single datacenter",
    "name": "DeleteSingleDatacenters",
    "group": "Datacenters",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Datacenter unique id.</p>"
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
    "filename": "app/inventory/routers/datacenters/datacenters.js",
    "groupTitle": "Datacenters"
  },
  {
    "type": "get",
    "url": "/datacenters/count",
    "title": "b. Count total dcs",
    "name": "GetCountDatacenter",
    "group": "Datacenters",
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
            "field": "provider",
            "description": "<p>Filters by provider.</p>"
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
    "filename": "app/inventory/routers/datacenters/datacenters.js",
    "groupTitle": "Datacenters"
  },
  {
    "type": "get",
    "url": "/datacenters/:id",
    "title": "c. Get single dc",
    "name": "GetCountDatacenter",
    "group": "Datacenters",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Datacenter unique id.</p>"
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
            "description": "<p>Token don´t have permission</p>"
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
    "filename": "app/inventory/routers/datacenters/datacenters.js",
    "groupTitle": "Datacenters"
  },
  {
    "type": "get",
    "url": "/datacenters",
    "title": "a. List your datacenters",
    "name": "GetDatacenter",
    "group": "Datacenters",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "Json",
            "optional": true,
            "field": "query",
            "description": "<p>Create a query to filters, the fields received some transformation. <br/></p> <pre class=\"prettyprint language-json\" data-type=\"json\"> <code>{ <br/>   \"name\": 'search by name', <br/>   \"provider\": 'search by provider name, like (AWS, OpenStack)' <br/>}  </code> </pre> <p><br/><b>Datacenters don´t have modifications, only default regex filter:</b> <br/><i>{alias} = {query into mongodb}</i></p> <ul>     <li>field is string the querie execute a regex research like \"%filter%\", EX: {'name': 'serv'}, It will return result with name 'services58' or '754services'.</li> </ul>"
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
            "field": "provider",
            "description": "<p>Filters by provider.</p>"
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
    "filename": "app/inventory/routers/datacenters/datacenters.js",
    "groupTitle": "Datacenters"
  },
  {
    "type": "get",
    "url": "/datacenters/:id/servers/count",
    "title": "b. Count servers by Dc",
    "name": "GetServersCountDatacenters",
    "group": "Datacenters",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Datacenter unique id.</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n   count: (Number)\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/inventory/routers/datacenters/datacenters.js",
    "groupTitle": "Datacenters"
  },
  {
    "type": "get",
    "url": "/datacenters/:id/servers/",
    "title": "b. Get server list by Dc",
    "name": "GetServersDatacenters",
    "group": "Datacenters",
    "description": "<p>List all servers filtered by id dc</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Datacenter unique id.</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n   found: 1,\n   limit: 20,\n   total_pages: 1,\n   current_page: 1,\n   items: (Array)\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/inventory/routers/datacenters/datacenters.js",
    "groupTitle": "Datacenters"
  },
  {
    "type": "put",
    "url": "/datacenters/:id",
    "title": "f. Full Update datacenter",
    "name": "PatchSingleDatacenters",
    "group": "Datacenters",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Datacenter unique id.</p>"
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
    "filename": "app/inventory/routers/datacenters/datacenters.js",
    "groupTitle": "Datacenters"
  },
  {
    "type": "patch",
    "url": "/datacenters/:id/sync_count_servers/",
    "title": "b. Sync servers",
    "name": "PatchSyncCountServers",
    "group": "Datacenters",
    "description": "<p>Syncronize all servers filters by id dc. (Count)</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Datacenter unique id.</p>"
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
    "filename": "app/inventory/routers/datacenters/datacenters.js",
    "groupTitle": "Datacenters"
  },
  {
    "type": "post",
    "url": "/datacenters/",
    "title": "d. Create single datacenter",
    "name": "PostDatacenters",
    "group": "Datacenters",
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
            "optional": false,
            "field": "provider",
            "description": "<p>Provider name (AWS, OpenStack)</p>"
          },
          {
            "group": "Body x-www",
            "type": "Array",
            "optional": false,
            "field": "regions",
            "description": "<p>Regions avaliable [Array of string]</p>"
          },
          {
            "group": "Body x-www",
            "type": "Array",
            "optional": true,
            "field": "zones",
            "description": "<p>Zones avaliable [Array of strings]</p>"
          },
          {
            "group": "Body x-www",
            "type": "Number",
            "optional": true,
            "field": "servers_count",
            "description": "<p>Total servers in DC, used /syncer</p>"
          },
          {
            "group": "Body x-www",
            "type": "Boolean",
            "optional": true,
            "field": "sucessed",
            "description": "<p>If DC have any connection, its true</p>"
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
    "filename": "app/inventory/routers/datacenters/datacenters.js",
    "groupTitle": "Datacenters"
  },
  {
    "type": "post",
    "url": "/datacenters/:id/roles/",
    "title": "h. Add access Role",
    "name": "PostRoleDatacenters",
    "group": "Datacenters",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Datacenter unique id.</p>"
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
    "filename": "app/inventory/routers/datacenters/datacenters.js",
    "groupTitle": "Datacenters"
  },
  {
    "type": "put",
    "url": "/datacenters/:id/roles",
    "title": "i. Update access role",
    "name": "PutRoleDatacenters",
    "group": "Datacenters",
    "description": "<p>Update all access roles, remember if you don´t send your access, after success you lose the access it´s</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Datacenter unique id.</p>"
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
    "filename": "app/inventory/routers/datacenters/datacenters.js",
    "groupTitle": "Datacenters"
  },
  {
    "type": "patch",
    "url": "/datacenters/:id",
    "title": "e. Update datacenter",
    "name": "PutSingleDatacenters",
    "group": "Datacenters",
    "description": "<p>Use patch to partial update.</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Datacenter unique id.</p>"
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
    "filename": "app/inventory/routers/datacenters/datacenters.js",
    "groupTitle": "Datacenters"
  },
  {
    "type": "put",
    "url": "/datacenters/:id/roles/:idu",
    "title": "j. Update specific access role",
    "name": "PutSingleRoleDatacenters",
    "group": "Datacenters",
    "description": "<p>Update access level one role to one application</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Datacenter unique id.</p>"
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
          "content": "HTTP/1.1 202 OK\n{}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/inventory/routers/datacenters/datacenters.js",
    "groupTitle": "Datacenters"
  },
  {
    "type": "delete",
    "url": "/flavors/:id",
    "title": "g. Delete single flavor",
    "name": "DeleteSingleFlavor",
    "group": "Flavors",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Flavor unique id.</p>"
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
    "filename": "app/inventory/routers/flavors/flavors.js",
    "groupTitle": "Flavors"
  },
  {
    "type": "get",
    "url": "/flavors/count",
    "title": "b. Count total flavors",
    "name": "GetCountFlavor",
    "group": "Flavors",
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
    "filename": "app/inventory/routers/flavors/flavors.js",
    "groupTitle": "Flavors"
  },
  {
    "type": "get",
    "url": "/flavors",
    "title": "a. List your flavors",
    "name": "GetFlavor",
    "group": "Flavors",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "Json",
            "optional": true,
            "field": "query",
            "description": "<p>Create a query to filters, the fields received some transformation. <br/></p> <pre class=\"prettyprint language-json\" data-type=\"json\"> <code>{ <br/>   \"name\": 'search by name' <br/>}  </code> </pre> <p><br/><b>Flavors don´t have modifications, only default regex filter:</b> <br/><i>{alias} = {query into mongodb}</i></p> <ul>     <li>field is string the querie execute a regex research like \"%filter%\", EX: {'name': 'serv'}, It will return result with name 'services58' or '754services'.</li> </ul>"
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
    "filename": "app/inventory/routers/flavors/flavors.js",
    "groupTitle": "Flavors"
  },
  {
    "type": "get",
    "url": "/flavors/:id",
    "title": "c. Get single flavor",
    "name": "GetSingleFlavor",
    "group": "Flavors",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Flavor unique id.</p>"
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
    "filename": "app/inventory/routers/flavors/flavors.js",
    "groupTitle": "Flavors"
  },
  {
    "type": "put",
    "url": "/flavors/:id",
    "title": "f. Full Update flavors",
    "name": "PatchSingleFlavor",
    "group": "Flavors",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Flavor unique id.</p>"
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
    "filename": "app/inventory/routers/flavors/flavors.js",
    "groupTitle": "Flavors"
  },
  {
    "type": "post",
    "url": "/flavors/",
    "title": "d. Create single flavor",
    "name": "PostFlavors",
    "group": "Flavors",
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
            "field": "api_name",
            "description": "<p>Api Name [min 3, max 150]</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": true,
            "field": "provider",
            "description": "<p>Provider [min 3, max 150]</p>"
          },
          {
            "group": "Body x-www",
            "type": "Array",
            "optional": true,
            "field": "tags",
            "description": "<p>List of tags, [Array of Objects] <br/></p> <pre class=\"prettyprint language-json\" data-type=\"json\"> <code>[{ <br/>   \"key\": (String), <br/>   \"value\": (String) <br/>}]  </code> </pre>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": false,
            "field": "unique_id",
            "description": "<p>Unique name, normally use in Databases</p>"
          },
          {
            "group": "Body x-www",
            "type": "Object",
            "optional": true,
            "field": "datacenters",
            "description": "<p>Datacenter, normally used in third services <br/></p> <pre class=\"prettyprint language-json\" data-type=\"json\"> <code>{ <br/>   \"_id\": (String), <br/>   \"provider\": (String), <br/>   \"name\": (String) <br/>}  </code> </pre>"
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
    "filename": "app/inventory/routers/flavors/flavors.js",
    "groupTitle": "Flavors"
  },
  {
    "type": "patch",
    "url": "/flavors/:id",
    "title": "e. Update flavors",
    "name": "PutSingleFlavor",
    "group": "Flavors",
    "description": "<p>Use patch to partial update.</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Flavor unique id.</p>"
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
    "filename": "app/inventory/routers/flavors/flavors.js",
    "groupTitle": "Flavors"
  },
  {
    "type": "delete",
    "url": "/images/:id/roles/:idu",
    "title": "l. Delete one role",
    "name": "DeleteRoleImages",
    "group": "Images",
    "description": "<p>Delete unique role.</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Image unique id.</p>"
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
    "filename": "app/inventory/routers/images/images.js",
    "groupTitle": "Images"
  },
  {
    "type": "delete",
    "url": "/images/:id",
    "title": "g. Delete single image",
    "name": "DeleteSingleImages",
    "group": "Images",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Image unique id.</p>"
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
    "filename": "app/inventory/routers/images/images.js",
    "groupTitle": "Images"
  },
  {
    "type": "get",
    "url": "/images/count",
    "title": "b. Count total apps",
    "name": "GetCountImages",
    "group": "Images",
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
    "filename": "app/inventory/routers/images/images.js",
    "groupTitle": "Images"
  },
  {
    "type": "get",
    "url": "/images",
    "title": "a. List your images",
    "name": "GetImages",
    "group": "Images",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "Json",
            "optional": true,
            "field": "query",
            "description": "<p>Create a query to filters, the fields received some transformation. <br/></p> <pre class=\"prettyprint language-json\" data-type=\"json\"> <code>{ <br/>   \"name\": 'search by name' <br/>}  </code> </pre> <p><br/><b>Images don´t have modifications, only default regex filter:</b> <br/><i>{alias} = {query into mongodb}</i></p> <ul>     <li>field is string the querie execute a regex research like \"%filter%\", EX: {'name': 'serv'}, It will return result with name 'services58' or '754services'.</li> </ul>"
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
    "filename": "app/inventory/routers/images/images.js",
    "groupTitle": "Images"
  },
  {
    "type": "get",
    "url": "/images/:id",
    "title": "c. Get single image",
    "name": "GetSingleImages",
    "group": "Images",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Images unique id.</p>"
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
    "filename": "app/inventory/routers/images/images.js",
    "groupTitle": "Images"
  },
  {
    "type": "put",
    "url": "/images/:id",
    "title": "f. Full Update image",
    "name": "PatchSingleImages",
    "group": "Images",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Image unique id.</p>"
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
    "filename": "app/inventory/routers/images/images.js",
    "groupTitle": "Images"
  },
  {
    "type": "post",
    "url": "/images/",
    "title": "d. Create single image",
    "name": "PostImages",
    "group": "Images",
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
            "field": "image_id",
            "description": "<p>Id Image [max 800]</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": true,
            "field": "image_type",
            "description": "<p>Type image (each provider have yours types)</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": true,
            "field": "image_location",
            "description": "<p>Path to volume location (each provider have yours rules)</p>"
          },
          {
            "group": "Body x-www",
            "type": "Array",
            "optional": true,
            "field": "tags",
            "description": "<p>List of tags, [Array of Objects] <br/></p> <pre class=\"prettyprint language-json\" data-type=\"json\"> <code>[{ <br/>   \"key\": (String), <br/>   \"value\": (String) <br/>}]  </code> </pre>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": false,
            "field": "unique_id",
            "description": "<p>Unique name, normally use in Databases</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": true,
            "field": "status",
            "description": "<p>Status, [Active, Avaliable, Stopped]</p>"
          },
          {
            "group": "Body x-www",
            "type": "Object",
            "optional": true,
            "field": "datacenters",
            "description": "<p>Datacenter, normally used in third services <br/></p> <pre class=\"prettyprint language-json\" data-type=\"json\"> <code>{ <br/>   \"_id\": (String), <br/>   \"provider\": (String), <br/>   \"name\": (String) <br/>}  </code> </pre>"
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
    "filename": "app/inventory/routers/images/images.js",
    "groupTitle": "Images"
  },
  {
    "type": "post",
    "url": "/images/:id/roles/",
    "title": "h. Add access Role",
    "name": "PostRoleImages",
    "group": "Images",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Image unique id.</p>"
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
    "filename": "app/inventory/routers/images/images.js",
    "groupTitle": "Images"
  },
  {
    "type": "put",
    "url": "/images/:id/roles",
    "title": "i. Update access role",
    "name": "PutRoleImages",
    "group": "Images",
    "description": "<p>Update all access roles, remember if you don´t send your access, after success you lose the access it´s</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Image unique id.</p>"
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
    "filename": "app/inventory/routers/images/images.js",
    "groupTitle": "Images"
  },
  {
    "type": "patch",
    "url": "/images/:id",
    "title": "e. Update image",
    "name": "PutSingleImages",
    "group": "Images",
    "description": "<p>Use patch to partial update.</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Image unique id.</p>"
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
    "filename": "app/inventory/routers/images/images.js",
    "groupTitle": "Images"
  },
  {
    "type": "put",
    "url": "/images/:id/roles/:idu",
    "title": "j. Update specific access role",
    "name": "PutSingleRoleImages",
    "group": "Images",
    "description": "<p>Update access level one role to one application</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Image unique id.</p>"
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
          "content": "HTTP/1.1 202 OK\n{}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/inventory/routers/images/images.js",
    "groupTitle": "Images"
  },
  {
    "type": "delete",
    "url": "/network/:id/roles/:idu",
    "title": "l. Delete one role",
    "name": "DeleteRoleNetworks",
    "group": "Networks",
    "description": "<p>Delete unique role.</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Image unique id.</p>"
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
    "filename": "app/inventory/routers/network/network.js",
    "groupTitle": "Networks"
  },
  {
    "type": "delete",
    "url": "/network/:id",
    "title": "g. Delete single network",
    "name": "DeleteSingleNetwork",
    "group": "Networks",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Network unique id.</p>"
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
    "filename": "app/inventory/routers/network/network.js",
    "groupTitle": "Networks"
  },
  {
    "type": "get",
    "url": "/network",
    "title": "a. List your network",
    "name": "GetNetwork",
    "group": "Networks",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "Json",
            "optional": true,
            "field": "query",
            "description": "<p>Create a query to filters, the fields received some transformation. <br/></p> <pre class=\"prettyprint language-json\" data-type=\"json\"> <code>{ <br/>   \"name\": 'search by name' <br/>}  </code> </pre> <p><br/><b>Network don´t have modifications, only default regex filter:</b> <br/><i>{alias} = {query into mongodb}</i></p> <ul>     <li>field is string the querie execute a regex research like \"%filter%\", EX: {'name': 'serv'}, It will return result with name 'services58' or '754services'.</li> </ul>"
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
            "field": "servers",
            "description": "<p>Filters by id server.</p>"
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
    "filename": "app/inventory/routers/network/network.js",
    "groupTitle": "Networks"
  },
  {
    "type": "get",
    "url": "/network/:id",
    "title": "c. Get single network",
    "name": "GetSingleNetwork",
    "group": "Networks",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Network unique id.</p>"
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
    "filename": "app/inventory/routers/network/network.js",
    "groupTitle": "Networks"
  },
  {
    "type": "get",
    "url": "/network/count",
    "title": "b. Count total networks",
    "name": "GetTotalNetwork",
    "group": "Networks",
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
    "filename": "app/inventory/routers/network/network.js",
    "groupTitle": "Networks"
  },
  {
    "type": "put",
    "url": "/network/:id",
    "title": "f. Full Update network",
    "name": "PatchSingleNetwork",
    "group": "Networks",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Network unique id.</p>"
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
    "filename": "app/inventory/routers/network/network.js",
    "groupTitle": "Networks"
  },
  {
    "type": "post",
    "url": "/network/",
    "title": "d. Create single image",
    "name": "PostNetworks",
    "group": "Networks",
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
            "type": "Array",
            "optional": true,
            "field": "tags",
            "description": "<p>List of tags, [Array of Objects] <br/></p> <pre class=\"prettyprint language-json\" data-type=\"json\"> <code>[{ <br/>   \"key\": (String), <br/>   \"value\": (String) <br/>}]  </code> </pre>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": false,
            "field": "unique_id",
            "description": "<p>Unique name, normally use in Databases</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": true,
            "field": "status",
            "description": "<p>Status, [Active, Avaliable, Stopped]</p>"
          },
          {
            "group": "Body x-www",
            "type": "Object",
            "optional": true,
            "field": "datacenters",
            "description": "<p>Datacenter, normally used in third services <br/></p> <pre class=\"prettyprint language-json\" data-type=\"json\"> <code>{ <br/>   \"_id\": (String), <br/>   \"provider\": (String), <br/>   \"name\": (String) <br/>}  </code> </pre>"
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
    "filename": "app/inventory/routers/network/network.js",
    "groupTitle": "Networks"
  },
  {
    "type": "post",
    "url": "/network/:id/roles/",
    "title": "h. Add access Role",
    "name": "PostRoleNetworks",
    "group": "Networks",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Image unique id.</p>"
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
    "filename": "app/inventory/routers/network/network.js",
    "groupTitle": "Networks"
  },
  {
    "type": "put",
    "url": "/network/:id/roles",
    "title": "i. Update access role",
    "name": "PutRoleNetworks",
    "group": "Networks",
    "description": "<p>Update all access roles, remember if you don´t send your access, after success you lose the access it´s</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Image unique id.</p>"
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
    "filename": "app/inventory/routers/network/network.js",
    "groupTitle": "Networks"
  },
  {
    "type": "patch",
    "url": "/network/:id",
    "title": "e. Update network",
    "name": "PutSingleNetwork",
    "group": "Networks",
    "description": "<p>Use patch to partial update.</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Network unique id.</p>"
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
    "filename": "app/inventory/routers/network/network.js",
    "groupTitle": "Networks"
  },
  {
    "type": "put",
    "url": "/network/:id/roles/:idu",
    "title": "j. Update specific access role",
    "name": "PutSingleRoleNetworks",
    "group": "Networks",
    "description": "<p>Update access level one role to one image</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Image unique id.</p>"
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
          "content": "HTTP/1.1 202 OK\n{}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/inventory/routers/network/network.js",
    "groupTitle": "Networks"
  },
  {
    "type": "get",
    "url": "/",
    "title": "Ping",
    "name": "GetPing",
    "group": "Ping",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   app: (String),\n   description: (String),\n   version: (Float),\n   api_timeout: (Number)\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/inventory/routers/servers/servers.js",
    "groupTitle": "Ping"
  },
  {
    "type": "delete",
    "url": "/servers/:id/roles/:idu",
    "title": "l. Delete one role",
    "name": "DeleteRoleServers",
    "group": "Servers",
    "description": "<p>Delete unique role.</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Server unique id.</p>"
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
    "filename": "app/inventory/routers/servers/servers.js",
    "groupTitle": "Servers"
  },
  {
    "type": "delete",
    "url": "/servers/:id",
    "title": "g. Delete single server",
    "name": "DeleteSingleServers",
    "group": "Servers",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Server unique id.</p>"
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
    "filename": "app/inventory/routers/servers/servers.js",
    "groupTitle": "Servers"
  },
  {
    "type": "get",
    "url": "/servers/count",
    "title": "b. Count total servers",
    "name": "GetCountServer",
    "group": "Servers",
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
            "field": "environment",
            "description": "<p>Filters by env (Production, Development).</p>"
          },
          {
            "group": "Param",
            "type": "String",
            "optional": true,
            "field": "role",
            "description": "<p>Filters by role (Application, Database, etc).</p>"
          },
          {
            "group": "Param",
            "type": "String",
            "optional": true,
            "field": "cpu",
            "description": "<p>Filter by CPU.</p>"
          },
          {
            "group": "Param",
            "type": "String",
            "optional": true,
            "field": "memory",
            "description": "<p>Filter by Memory.</p>"
          },
          {
            "group": "Param",
            "type": "String",
            "optional": true,
            "field": "ipv4_private",
            "description": "<p>Filter by private IP.</p>"
          },
          {
            "group": "Param",
            "type": "String",
            "optional": true,
            "field": "ipv4_public",
            "description": "<p>Filter by public IP.</p>"
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
    "filename": "app/inventory/routers/servers/servers.js",
    "groupTitle": "Servers"
  },
  {
    "type": "get",
    "url": "/servers",
    "title": "a. List your servers",
    "name": "GetServer",
    "group": "Servers",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "Json",
            "optional": true,
            "field": "query",
            "description": "<p>Create a query to filters, the fields received some transformation. <br/></p> <pre class=\"prettyprint language-json\" data-type=\"json\"> <code>{ <br/>   \"name\": 'search by name', <br/>   \"datacenters\": 'search by dc name' <br/>}  </code> </pre> <p><br/><b>The list modification is:</b> <br/><i>{alias} = {query into mongodb}</i></p> <ul>     <li>id = _id</li>     <li>datacenters = datacenters.name</li>     <li>os = os.base</li>     <li>auth = auth.type</li>     <li>user = auth.username</li>     <li>field is string the querie execute a regex research like \"%filter%\", EX: {'name': 'serv'}, It will return servers with name 'services58' or '754services'.</li> </ul>"
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
            "field": "environment",
            "description": "<p>Filters by env (Production, Development).</p>"
          },
          {
            "group": "Param",
            "type": "String",
            "optional": true,
            "field": "role",
            "description": "<p>Filters by role (Application, Database, etc).</p>"
          },
          {
            "group": "Param",
            "type": "String",
            "optional": true,
            "field": "cpu",
            "description": "<p>Filter by CPU.</p>"
          },
          {
            "group": "Param",
            "type": "String",
            "optional": true,
            "field": "memory",
            "description": "<p>Filter by Memory.</p>"
          },
          {
            "group": "Param",
            "type": "String",
            "optional": true,
            "field": "ipv4_private",
            "description": "<p>Filter by private IP.</p>"
          },
          {
            "group": "Param",
            "type": "String",
            "optional": true,
            "field": "ipv4_public",
            "description": "<p>Filter by public IP.</p>"
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
    "filename": "app/inventory/routers/servers/servers.js",
    "groupTitle": "Servers"
  },
  {
    "type": "get",
    "url": "/servers/:id",
    "title": "c. Get single server",
    "name": "GetSingleServer",
    "group": "Servers",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Server unique id.</p>"
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
    "filename": "app/inventory/routers/servers/servers.js",
    "groupTitle": "Servers"
  },
  {
    "type": "put",
    "url": "/servers/:id",
    "title": "f. Full Update server",
    "name": "PatchSingleServers",
    "group": "Servers",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Server unique id.</p>"
          }
        ],
        "Body x-www": [
          {
            "group": "Body x-www",
            "type": "String",
            "optional": false,
            "field": "hostname",
            "description": "<p>Hostname [min 3, max 150]</p>"
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
    "filename": "app/inventory/routers/servers/servers.js",
    "groupTitle": "Servers"
  },
  {
    "type": "post",
    "url": "/servers/:id/roles/",
    "title": "h. Add access Role",
    "name": "PostRoleServers",
    "group": "Servers",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Server unique id.</p>"
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
    "filename": "app/inventory/routers/servers/servers.js",
    "groupTitle": "Servers"
  },
  {
    "type": "post",
    "url": "/servers/",
    "title": "d. Create single server",
    "name": "PostServers",
    "group": "Servers",
    "parameter": {
      "fields": {
        "Body x-www": [
          {
            "group": "Body x-www",
            "type": "String",
            "optional": false,
            "field": "hostname",
            "description": "<p>Hostname [min 3, max 30]</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": false,
            "field": "ipv4_private",
            "description": "<p>IP Private [min 3, max 30]</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": false,
            "field": "ipv4_public",
            "description": "<p>IP Public [min 3, max 30]</p>"
          },
          {
            "group": "Body x-www",
            "type": "Object",
            "optional": false,
            "field": "os",
            "description": "<p>OS <br/></p> <pre class=\"prettyprint language-json\" data-type=\"json\"> <code>{ <br/>   \"base\": (String), [max 40] <br/>   \"dist\": (String), <br/>   \"version\": (String) <br/>}  </code> </pre>"
          },
          {
            "group": "Body x-www",
            "type": "Number",
            "optional": false,
            "field": "cpu",
            "description": "<p>CPU in GBs [positive max 1024]</p>"
          },
          {
            "group": "Body x-www",
            "type": "Number",
            "optional": false,
            "field": "memory",
            "description": "<p>Memory in GBs [positive max 1024]</p>"
          },
          {
            "group": "Body x-www",
            "type": "Array",
            "optional": false,
            "field": "storage",
            "description": "<p>Storage <br/></p> <pre class=\"prettyprint language-json\" data-type=\"json\"> <code>[{ <br/>   \"name\": (String), [max 100] <br/>   \"size\": (Number), <br/>   \"root\": (String) [max 10] <br/>   \"status\": (String) [max 10] <br/>   \"volume_id\": (String) [max 35] <br/>   \"attach_time\": (String) [max 30] <br/>   \"delete_termination\": (Any) <br/>}]  </code> </pre>"
          },
          {
            "group": "Body x-www",
            "type": "Array",
            "optional": false,
            "field": "services",
            "description": "<p>List of Services [Objects] <br/></p> <pre class=\"prettyprint language-json\" data-type=\"json\"> <code>[{ <br/>   \"name\": (String), [max 100] <br/>   \"status\": (Number), <br/>   \"version\": (String) [max 10] <br/>   \"configs\": (String) [max 35] <br/>   \"setup\": (String) [max 30] <br/>}]  </code> </pre>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>Server responsability ['Application', 'Cache', 'Container', 'Database', 'File', 'Loadbalance', 'Monitoring', 'NAT', 'Proxy', 'SMTP', 'VPN', 'Standard']</p>"
          },
          {
            "group": "Body x-www",
            "type": "Array",
            "optional": false,
            "field": "auth",
            "description": "<p>Methods to auth [Array of Objects] <br/></p> <pre class=\"prettyprint language-json\" data-type=\"json\"> <code>[{ <br/>   \"name\": (String), [max 100] <br/>   \"type\": (String), ['PKI', 'AD', 'LDAP', 'Password'] <br/>   \"username\": (String) [max 100] <br/>   \"key\": (String) [max 100] <br/>}]  </code> </pre>"
          },
          {
            "group": "Body x-www",
            "type": "Array",
            "optional": true,
            "field": "tags",
            "description": "<p>List of tags, [Array of Objects] <br/></p> <pre class=\"prettyprint language-json\" data-type=\"json\"> <code>[{ <br/>   \"key\": (String), <br/>   \"value\": (String) <br/>}]  </code> </pre>"
          },
          {
            "group": "Body x-www",
            "type": "Object",
            "optional": true,
            "field": "datacenters",
            "description": "<p>Datacenter, normally used in third services <br/></p> <pre class=\"prettyprint language-json\" data-type=\"json\"> <code>{ <br/>   \"_id\": (String), <br/>   \"provider\": (String), <br/>   \"name\": (String) <br/>}  </code> </pre>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": true,
            "field": "environment",
            "description": "<p>Envronment, ['Production', 'Staging', 'Development', 'UTA', 'Training', 'SandBox']</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": true,
            "field": "status",
            "description": "<p>Status ['Active', 'Avaliable', 'Stopped']</p>"
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
    "filename": "app/inventory/routers/servers/servers.js",
    "groupTitle": "Servers"
  },
  {
    "type": "put",
    "url": "/servers/:id/roles",
    "title": "i. Update access role",
    "name": "PutRoleServers",
    "group": "Servers",
    "description": "<p>Update all access roles, remember if you don´t send your access, after success you lose the access it´s</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Server unique id.</p>"
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
    "filename": "app/inventory/routers/servers/servers.js",
    "groupTitle": "Servers"
  },
  {
    "type": "put",
    "url": "/servers/:id/roles/:idu",
    "title": "j. Update specific access role",
    "name": "PutSingleRoleServers",
    "group": "Servers",
    "description": "<p>Update access level one role to one server</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Server unique id.</p>"
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
    "filename": "app/inventory/routers/servers/servers.js",
    "groupTitle": "Servers"
  },
  {
    "type": "patch",
    "url": "/servers/:id",
    "title": "e. Update server",
    "name": "PutSingleServers",
    "group": "Servers",
    "description": "<p>Use patch to partial update.</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Server unique id.</p>"
          }
        ],
        "Body x-www": [
          {
            "group": "Body x-www",
            "type": "String",
            "optional": false,
            "field": "hostname",
            "description": "<p>Hostname [min 3, max 150]</p>"
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
    "filename": "app/inventory/routers/servers/servers.js",
    "groupTitle": "Servers"
  },
  {
    "type": "delete",
    "url": "/snapshots/:id/roles/:idu",
    "title": "l. Delete one role",
    "name": "DeleteRoleSnapshots",
    "group": "Snapshots",
    "description": "<p>Delete unique role.</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Snapshot unique id.</p>"
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
    "filename": "app/inventory/routers/snapshots/snapshots.js",
    "groupTitle": "Snapshots"
  },
  {
    "type": "delete",
    "url": "/snapshots/:id",
    "title": "g. Delete single snapshot",
    "name": "DeleteSingleSnapshots",
    "group": "Snapshots",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Snapshot unique id.</p>"
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
    "filename": "app/inventory/routers/snapshots/snapshots.js",
    "groupTitle": "Snapshots"
  },
  {
    "type": "get",
    "url": "/snapshots/:id",
    "title": "c. Get single snapshot",
    "name": "GetSingleSnapshot",
    "group": "Snapshots",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Snapshot unique id.</p>"
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
    "filename": "app/inventory/routers/snapshots/snapshots.js",
    "groupTitle": "Snapshots"
  },
  {
    "type": "get",
    "url": "/snapshots",
    "title": "a. List your snapshots",
    "name": "GetSnapshot",
    "group": "Snapshots",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "Json",
            "optional": true,
            "field": "query",
            "description": "<p>Create a query to filters, the fields received some transformation. <br/></p> <pre class=\"prettyprint language-json\" data-type=\"json\"> <code>{ <br/>   \"name\": 'search by name' <br/>}  </code> </pre> <p><br/><b>Snapshots don´t have modifications, only default regex filter:</b> <br/><i>{alias} = {query into mongodb}</i></p> <ul>     <li>field is string the querie execute a regex research like \"%filter%\", EX: {'name': 'serv'}, It will return result with name 'services58' or '754services'.</li> </ul>"
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
    "filename": "app/inventory/routers/snapshots/snapshots.js",
    "groupTitle": "Snapshots"
  },
  {
    "type": "get",
    "url": "/snapshots/count",
    "title": "b. Count total snapshots",
    "name": "GetTotalSnapshot",
    "group": "Snapshots",
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
    "filename": "app/inventory/routers/snapshots/snapshots.js",
    "groupTitle": "Snapshots"
  },
  {
    "type": "put",
    "url": "/snapshots/:id",
    "title": "f. Full Update snapshot",
    "name": "PatchSingleSnapshots",
    "group": "Snapshots",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Snapshot unique id.</p>"
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
    "filename": "app/inventory/routers/snapshots/snapshots.js",
    "groupTitle": "Snapshots"
  },
  {
    "type": "post",
    "url": "/snapshots/:id/roles/",
    "title": "h. Add access Role",
    "name": "PostRoleSnapshots",
    "group": "Snapshots",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Snapshot unique id.</p>"
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
    "filename": "app/inventory/routers/snapshots/snapshots.js",
    "groupTitle": "Snapshots"
  },
  {
    "type": "post",
    "url": "/snapshots/",
    "title": "d. Create single image",
    "name": "PostSnapshots",
    "group": "Snapshots",
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
            "type": "Array",
            "optional": true,
            "field": "tags",
            "description": "<p>List of tags, [Array of Objects] <br/></p> <pre class=\"prettyprint language-json\" data-type=\"json\"> <code>[{ <br/>   \"key\": (String), <br/>   \"value\": (String) <br/>}]  </code> </pre>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": false,
            "field": "unique_id",
            "description": "<p>Unique name, normally use in Databases</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": true,
            "field": "status",
            "description": "<p>Status, [Active, Avaliable, Stopped]</p>"
          },
          {
            "group": "Body x-www",
            "type": "Object",
            "optional": true,
            "field": "datacenters",
            "description": "<p>Datacenter, normally used in third services <br/></p> <pre class=\"prettyprint language-json\" data-type=\"json\"> <code>{ <br/>   \"_id\": (String), <br/>   \"provider\": (String), <br/>   \"name\": (String) <br/>}  </code> </pre>"
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
    "filename": "app/inventory/routers/snapshots/snapshots.js",
    "groupTitle": "Snapshots"
  },
  {
    "type": "put",
    "url": "/snapshots/:id/roles",
    "title": "i. Update access role",
    "name": "PutRoleSnapshots",
    "group": "Snapshots",
    "description": "<p>Update all access roles, remember if you don´t send your access, after success you lose the access it´s</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Snapshot unique id.</p>"
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
    "filename": "app/inventory/routers/snapshots/snapshots.js",
    "groupTitle": "Snapshots"
  },
  {
    "type": "put",
    "url": "/snapshots/:id/roles/:idu",
    "title": "j. Update specific access role",
    "name": "PutSingleRoleSnapshots",
    "group": "Snapshots",
    "description": "<p>Update access level one role to one snapshot</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Snapshot unique id.</p>"
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
          "content": "HTTP/1.1 202 OK\n{}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/inventory/routers/snapshots/snapshots.js",
    "groupTitle": "Snapshots"
  },
  {
    "type": "patch",
    "url": "/snapshots/:id",
    "title": "e. Update snapshot",
    "name": "PutSingleSnapshots",
    "group": "Snapshots",
    "description": "<p>Use patch to partial update.</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Snapshot unique id.</p>"
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
    "filename": "app/inventory/routers/snapshots/snapshots.js",
    "groupTitle": "Snapshots"
  },
  {
    "type": "delete",
    "url": "/system/:id/roles/:idu",
    "title": "l. Delete one role",
    "name": "DeleteRoleSystems",
    "group": "Systems",
    "description": "<p>Delete unique role.</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Systems unique id.</p>"
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
    "filename": "app/inventory/routers/system/system.js",
    "groupTitle": "Systems"
  },
  {
    "type": "delete",
    "url": "/system/:id",
    "title": "g. Delete single system",
    "name": "DeleteSingleSystems",
    "group": "Systems",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>System unique id.</p>"
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
    "filename": "app/inventory/routers/system/system.js",
    "groupTitle": "Systems"
  },
  {
    "type": "get",
    "url": "/system/:id/applications",
    "title": "n. Delete application into system",
    "name": "DeleteSystemApplications",
    "group": "Systems",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>System unique id.</p>"
          }
        ],
        "www-body": [
          {
            "group": "www-body",
            "type": "Array",
            "optional": false,
            "field": "id",
            "description": "<p>List of applications ids [Array of strings].</p>"
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
    "filename": "app/inventory/routers/system/system.js",
    "groupTitle": "Systems"
  },
  {
    "type": "get",
    "url": "/system/:id",
    "title": "c. Get single system",
    "name": "Get_single_system_",
    "group": "Systems",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>System unique id.</p>"
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
    "filename": "app/inventory/routers/system/system.js",
    "groupTitle": "Systems"
  },
  {
    "type": "get",
    "url": "/system/count",
    "title": "b. Count total systems",
    "name": "Get_total_systems_",
    "group": "Systems",
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
    "filename": "app/inventory/routers/system/system.js",
    "groupTitle": "Systems"
  },
  {
    "type": "get",
    "url": "/system",
    "title": "a. List your system",
    "name": "List_all_active_system__have_a_posibility_to_use_filters__pagination__queries_and_etc_",
    "group": "Systems",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "Json",
            "optional": true,
            "field": "query",
            "description": "<p>Create a query to filters, the fields received some transformation. <br/></p> <pre class=\"prettyprint language-json\" data-type=\"json\"> <code>{ <br/>   \"name\": 'search by name' <br/>}  </code> </pre> <p><br/><b>System don´t have modifications, only default regex filter:</b> <br/><i>{alias} = {query into mongodb}</i></p> <ul>     <li>field is string the querie execute a regex research like \"%filter%\", EX: {'name': 'serv'}, It will return result with name 'services58' or '754services'.</li> </ul>"
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
    "filename": "app/inventory/routers/system/system.js",
    "groupTitle": "Systems"
  },
  {
    "type": "put",
    "url": "/system/:id",
    "title": "f. Full Update system",
    "name": "PatchSingleSystems",
    "group": "Systems",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>System unique id.</p>"
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
    "filename": "app/inventory/routers/system/system.js",
    "groupTitle": "Systems"
  },
  {
    "type": "patch",
    "url": "/system/:id/applications",
    "title": "m. Add application into system",
    "name": "PatchSystemApplications",
    "group": "Systems",
    "description": "<p>Add a system in especific application</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>System unique id.</p>"
          }
        ],
        "www-body": [
          {
            "group": "www-body",
            "type": "Array",
            "optional": false,
            "field": "id",
            "description": "<p>List of applications ids [Array of strings].</p>"
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
    "filename": "app/inventory/routers/system/system.js",
    "groupTitle": "Systems"
  },
  {
    "type": "post",
    "url": "/system/:id/roles/",
    "title": "h. Add access Role",
    "name": "PostRoleSystems",
    "group": "Systems",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Systems unique id.</p>"
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
    "filename": "app/inventory/routers/system/system.js",
    "groupTitle": "Systems"
  },
  {
    "type": "post",
    "url": "/system/",
    "title": "d. Create single system",
    "name": "PostSystems",
    "group": "Systems",
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
            "type": "Array",
            "optional": true,
            "field": "clients",
            "description": "<p>Clients owners [Array of objects] <br/></p> <pre class=\"prettyprint language-json\" data-type=\"json\"> <code>[{ <br/>   \"name\": (String), <br/>   \"email\": (String), <br/>   \"role\": (Number), //'1 | 3 | 7' <br/>   \"id\": (String), <br/>   \"refs\": (String) <br/>}]  </code> </pre>"
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
    "filename": "app/inventory/routers/system/system.js",
    "groupTitle": "Systems"
  },
  {
    "type": "put",
    "url": "/system/:id/roles",
    "title": "i. Update access role",
    "name": "PutRoleSystems",
    "group": "Systems",
    "description": "<p>Update all access roles, remember if you don´t send your access, after success you lose the access it´s</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Systems unique id.</p>"
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
    "filename": "app/inventory/routers/system/system.js",
    "groupTitle": "Systems"
  },
  {
    "type": "put",
    "url": "/system/:id/roles/:idu",
    "title": "j. Update specific access role",
    "name": "PutSingleRoleSystems",
    "group": "Systems",
    "description": "<p>Update access level one role to one system</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Systems unique id.</p>"
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
          "content": "HTTP/1.1 202 OK\n{}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/inventory/routers/system/system.js",
    "groupTitle": "Systems"
  },
  {
    "type": "patch",
    "url": "/system/:id",
    "title": "e. Update system",
    "name": "PutSingleSystems",
    "group": "Systems",
    "description": "<p>Use patch to partial update.</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>System unique id.</p>"
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
    "filename": "app/inventory/routers/system/system.js",
    "groupTitle": "Systems"
  },
  {
    "type": "delete",
    "url": "/teams/:id/system/:idu/applications",
    "title": "syn. Delete single app for teams",
    "name": "DeleteAppInSystemTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/system/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "delete",
    "url": "/teams/:id/clients/:idu",
    "title": "clf. Single Clients for Team",
    "name": "DeleteSingleListClientsTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/clients/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "delete",
    "url": "/teams/:id/connections/:idu",
    "title": "cf. Single Conn for Team",
    "name": "DeleteSingleListConnTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/connections/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "delete",
    "url": "/teams/:id/datacenters/:idu",
    "title": "df. Single Dcs for Team",
    "name": "DeleteSingleListDcsTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/datacenters/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "delete",
    "url": "/teams/:id/flavors/:idu",
    "title": "flf. Single Flavors for Team",
    "name": "DeleteSingleListFlavorsTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/flavors/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "delete",
    "url": "/teams/:id/images/:idu",
    "title": "if. Single Images for Team",
    "name": "DeleteSingleListImagesTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/images/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "delete",
    "url": "/teams/:id/network/:idu",
    "title": "nf. Single Network for Team",
    "name": "DeleteSingleListNetworkTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/network/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "delete",
    "url": "/teams/:id/servers/:idu",
    "title": "sf. Single Servers for Team",
    "name": "DeleteSingleListServersTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/servers/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "delete",
    "url": "/teams/:id/snapshots/:idu",
    "title": "snf. Single Snapshots for Team",
    "name": "DeleteSingleListSnapshotsTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/snapshots/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "delete",
    "url": "/teams/:id/system/:idu",
    "title": "syf. Single System for Team",
    "name": "DeleteSingleListSystemTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/system/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "delete",
    "url": "/teams/:id/applications/:idu",
    "title": "af. Single App for Team",
    "name": "DeleteSingleListTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/applications/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "delete",
    "url": "/teams/:id/volumes/:idu",
    "title": "vf. Single Volumes for Team",
    "name": "DeleteSingleListVolumesTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/volumes/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "delete",
    "url": "/teams/:id/clients/:idu/system",
    "title": "cln. Delete single system for teams",
    "name": "DeleteSystemInTeamTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/clients/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/teams/:id/connections/",
    "title": "ca. List Conn for Team",
    "name": "GetConnTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/connections/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/teams/:id/clients/count",
    "title": "clb. Count Clients for Team",
    "name": "GetCountListClientsTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/clients/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/teams/:id/connections/count",
    "title": "cb. Count Conn for Team",
    "name": "GetCountListConnTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/connections/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/teams/:id/datacenters/count",
    "title": "db. Count Dcs for Team",
    "name": "GetCountListDcsTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/datacenters/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/teams/:id/flavors/count",
    "title": "flb. Count Flavors for Team",
    "name": "GetCountListFlavorsTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/flavors/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/teams/:id/images/count",
    "title": "ib. Count Images for Team",
    "name": "GetCountListImagesTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/images/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/teams/:id/network/count",
    "title": "nb. Count Network for Team",
    "name": "GetCountListNetworkTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/network/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/teams/:id/servers/count",
    "title": "sb. Count Servers for Team",
    "name": "GetCountListServersTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/servers/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/teams/:id/snapshots/count",
    "title": "snb. Count Snapshots for Team",
    "name": "GetCountListSnapshotsTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/snapshots/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/teams/:id/system/count",
    "title": "syb. Count System for Team",
    "name": "GetCountListSystemTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/system/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/teams/:id/applications/count",
    "title": "ab. Count App for Team",
    "name": "GetCountListTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/applications/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/teams/:id/volumes/count",
    "title": "vb. Count Volumes for Team",
    "name": "GetCountListVolumesTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/volumes/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/teams/:id/datacenters/count",
    "title": "dn. Count Servers by Dcs",
    "name": "GetCountServersDcTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/datacenters/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/teams/:id/clients",
    "title": "cla. List Clients for Team",
    "name": "GetListClients",
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
            "description": "<p>Client unique ID.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/inventory/routers/clients/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/teams/:id/datacenters",
    "title": "da. List DCs for Team",
    "name": "GetListDatacenter",
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
            "description": "<p>Datacenter unique ID.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/inventory/routers/datacenters/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/teams/:id/flavors",
    "title": "fla. List Flavors for Team",
    "name": "GetListFlavor",
    "group": "Teams",
    "description": "<p>Use for teams scope, have be all actions, params and option in /flavors,</p>",
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
            "description": "<p>Flavor unique ID.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/inventory/routers/flavors/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/teams/:id/images",
    "title": "ia. List Images for Team",
    "name": "GetListImages",
    "group": "Teams",
    "description": "<p>Use for teams scope, have be all actions, params and option in /images,</p>",
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
            "description": "<p>Image unique ID.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/inventory/routers/images/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/teams/:id/network",
    "title": "na. List Network for Team",
    "name": "GetListNetwork",
    "group": "Teams",
    "description": "<p>Use for teams scope, have be all actions, params and option in /network,</p>",
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
            "description": "<p>Network unique ID.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/inventory/routers/network/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/teams/:id/servers",
    "title": "sa. List Servers for Team",
    "name": "GetListServers",
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
    "filename": "app/inventory/routers/servers/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/teams/:id/datacenters/:idu/servers/",
    "title": "dm. Count servers by Dc",
    "name": "GetListServersDcTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/datacenters/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/teams/:id/snapshots",
    "title": "sna. List Snapshots for Team",
    "name": "GetListSnapshots",
    "group": "Teams",
    "description": "<p>Use for teams scope, have be all actions, params and option in /snapshots,</p>",
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
            "description": "<p>Snapshot unique ID.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/inventory/routers/snapshots/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/teams/:id/system",
    "title": "sya. List System for Team",
    "name": "GetListSystem",
    "group": "Teams",
    "description": "<p>Use for teams scope, have be all actions, params and option in /system,</p>",
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
            "description": "<p>System unique ID.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/inventory/routers/system/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/teams/:id/applications",
    "title": "aa. List App for Team",
    "name": "GetListTeam",
    "group": "Teams",
    "description": "<p>Use for teams scope, have be all actions, params and option in /applications,</p>",
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
            "description": "<p>App unique ID.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/inventory/routers/applications/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/teams/:id/volumes",
    "title": "va. List Volumes for Team",
    "name": "GetListVolumes",
    "group": "Teams",
    "description": "<p>Use for teams scope, have be all actions, params and option in /volumes,</p>",
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
            "description": "<p>Volume unique ID.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/inventory/routers/volumes/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "patch",
    "url": "/teams/:id/clients/:idu",
    "title": "cle. Partial Clients for Team",
    "name": "GetPartialSingleListClientsTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/clients/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "patch",
    "url": "/teams/:id/connections/:idu",
    "title": "ce. Partial Conn for Team",
    "name": "GetPartialSingleListConnTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/connections/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "patch",
    "url": "/teams/:id/datacenters/:idu",
    "title": "de. Partial Dcs for Team",
    "name": "GetPartialSingleListDcsTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/datacenters/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "patch",
    "url": "/teams/:id/flavors/:idu",
    "title": "fle. Partial Flavors for Team",
    "name": "GetPartialSingleListFlavorsTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/flavors/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "patch",
    "url": "/teams/:id/images/:idu",
    "title": "ie. Partial Images for Team",
    "name": "GetPartialSingleListImagesTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/images/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "patch",
    "url": "/teams/:id/network/:idu",
    "title": "ne. Partial Network for Team",
    "name": "GetPartialSingleListNetworkTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/network/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "patch",
    "url": "/teams/:id/servers/:idu",
    "title": "se. Partial Servers for Team",
    "name": "GetPartialSingleListServersTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/servers/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "patch",
    "url": "/teams/:id/snapshots/:idu",
    "title": "sne. Partial Snapshots for Team",
    "name": "GetPartialSingleListSnapshotsTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/snapshots/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "patch",
    "url": "/teams/:id/system/:idu",
    "title": "sye. Partial System for Team",
    "name": "GetPartialSingleListSystemTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/system/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "patch",
    "url": "/teams/:id/applications/:idu",
    "title": "ae. Partial App for Team",
    "name": "GetPartialSingleListTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/applications/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "patch",
    "url": "/teams/:id/volumes/:idu",
    "title": "ve. Partial Volumes for Team",
    "name": "GetPartialSingleListVolumesTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/volumes/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/teams/:id/clients/:idu",
    "title": "clc. Single Client for Team",
    "name": "GetSingleListClientsTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/clients/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "post",
    "url": "/teams/:id/clients/:idu/roles",
    "title": "clh. Create access role",
    "name": "GetSingleListClientsTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/clients/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "put",
    "url": "/teams/:id/clients/:idu/roles/:ida",
    "title": "clj. Update access role",
    "name": "GetSingleListClientsTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/clients/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "delete",
    "url": "/teams/:id/clients/:idu/roles/:ida",
    "title": "cll. Delete access role",
    "name": "GetSingleListClientsTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/clients/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "put",
    "url": "/teams/:id/clients/:idu/roles",
    "title": "cli. Update all access role",
    "name": "GetSingleListClientsTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/clients/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "post",
    "url": "/teams/:id/connections/:idu/roles",
    "title": "ch. Create access role",
    "name": "GetSingleListConnTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/connections/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/teams/:id/connections/:idu",
    "title": "cc. Single Conn for Team",
    "name": "GetSingleListConnTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/connections/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "put",
    "url": "/teams/:id/connections/:idu/roles/:ida",
    "title": "cj. Update access role",
    "name": "GetSingleListConnTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/connections/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "delete",
    "url": "/teams/:id/connections/:idu/roles/:ida",
    "title": "cl. Delete access role",
    "name": "GetSingleListConnTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/connections/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "put",
    "url": "/teams/:id/connections/:idu/roles",
    "title": "ci. Update all access role",
    "name": "GetSingleListConnTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/connections/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "delete",
    "url": "/teams/:id/datacenters/:idu/roles/:ida",
    "title": "dl. Delete access role",
    "name": "GetSingleListDcsTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/datacenters/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "put",
    "url": "/teams/:id/datacenters/:idu/roles/:ida",
    "title": "dj. Update access role",
    "name": "GetSingleListDcsTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/datacenters/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "put",
    "url": "/teams/:id/datacenters/:idu/roles",
    "title": "di. Update all access role",
    "name": "GetSingleListDcsTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/datacenters/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "post",
    "url": "/teams/:id/datacenters/:idu/roles",
    "title": "dh. Create access role",
    "name": "GetSingleListDcsTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/datacenters/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/teams/:id/datacenters/:idu",
    "title": "dc. Single Dcs for Team",
    "name": "GetSingleListDcsTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/datacenters/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/teams/:id/flavors/:idu",
    "title": "flc. Single Flavors for Team",
    "name": "GetSingleListFlavorsTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/flavors/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "put",
    "url": "/teams/:id/images/:idu/roles",
    "title": "ii. Update all access role",
    "name": "GetSingleListImagesTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/images/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/teams/:id/images/:idu",
    "title": "ic. Single Images for Team",
    "name": "GetSingleListImagesTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/images/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "delete",
    "url": "/teams/:id/images/:idu/roles/:ida",
    "title": "il. Delete access role",
    "name": "GetSingleListImagesTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/images/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "put",
    "url": "/teams/:id/images/:idu/roles/:ida",
    "title": "ij. Update access role",
    "name": "GetSingleListImagesTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/images/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "post",
    "url": "/teams/:id/images/:idu/roles",
    "title": "ih. Create access role",
    "name": "GetSingleListImagesTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/images/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/teams/:id/network/:idu",
    "title": "nc. Single Network for Team",
    "name": "GetSingleListNetworkTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/network/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "put",
    "url": "/teams/:id/network/:idu/roles/:ida",
    "title": "nj. Update access role",
    "name": "GetSingleListNetworkTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/network/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "put",
    "url": "/teams/:id/network/:idu/roles",
    "title": "ni. Update all access role",
    "name": "GetSingleListNetworkTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/network/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "delete",
    "url": "/teams/:id/network/:idu/roles/:ida",
    "title": "nl. Delete access role",
    "name": "GetSingleListNetworkTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/network/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/teams/:id/servers/:idu",
    "title": "sc. Single Servers for Team",
    "name": "GetSingleListServersTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/servers/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "post",
    "url": "/teams/:id/servers/:idu/roles",
    "title": "sh. Create access role",
    "name": "GetSingleListServersTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/servers/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "put",
    "url": "/teams/:id/servers/:idu/roles",
    "title": "si. Update all access role",
    "name": "GetSingleListServersTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/servers/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "put",
    "url": "/teams/:id/servers/:idu/roles/:ida",
    "title": "sj. Update access role",
    "name": "GetSingleListServersTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/servers/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "delete",
    "url": "/teams/:id/servers/:idu/roles/:ida",
    "title": "sl. Delete access role",
    "name": "GetSingleListServersTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/servers/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "put",
    "url": "/teams/:id/snapshots/:idu/roles",
    "title": "sni. Update all access role",
    "name": "GetSingleListSnapshotsTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/snapshots/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "delete",
    "url": "/teams/:id/snapshots/:idu/roles/:ida",
    "title": "snl. Delete access role",
    "name": "GetSingleListSnapshotsTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/snapshots/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/teams/:id/snapshots/:idu",
    "title": "snc. Single Snapshots for Team",
    "name": "GetSingleListSnapshotsTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/snapshots/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "post",
    "url": "/teams/:id/snapshots/:idu/roles",
    "title": "snh. Create access role",
    "name": "GetSingleListSnapshotsTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/snapshots/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "put",
    "url": "/teams/:id/snapshots/:idu/roles/:ida",
    "title": "snj. Update access role",
    "name": "GetSingleListSnapshotsTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/snapshots/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "delete",
    "url": "/teams/:id/system/:idu/roles/:ida",
    "title": "syl. Delete access role",
    "name": "GetSingleListSystemTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/system/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/teams/:id/system/:idu",
    "title": "syc. Single System for Team",
    "name": "GetSingleListSystemTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/system/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "post",
    "url": "/teams/:id/system/:idu/roles",
    "title": "syh. Create access role",
    "name": "GetSingleListSystemTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/system/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "put",
    "url": "/teams/:id/system/:idu/roles",
    "title": "syi. Update all access role",
    "name": "GetSingleListSystemTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/system/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "put",
    "url": "/teams/:id/system/:idu/roles/:ida",
    "title": "syj. Update access role",
    "name": "GetSingleListSystemTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/system/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/teams/:id/applications/:idu",
    "title": "ac. Single App for Team",
    "name": "GetSingleListTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/applications/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "put",
    "url": "/teams/:id/applications/:idu/roles/:ida",
    "title": "aj. Update access role",
    "name": "GetSingleListTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/applications/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "post",
    "url": "/teams/:id/applications/:idu/roles",
    "title": "ah. Create access role",
    "name": "GetSingleListTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/applications/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "post",
    "url": "/teams/:id/network/:idu/roles",
    "title": "nh. Create access role",
    "name": "GetSingleListTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/network/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "delete",
    "url": "/teams/:id/applications/:idu/roles/:ida",
    "title": "al. Delete access role",
    "name": "GetSingleListTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/applications/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "put",
    "url": "/teams/:id/applications/:idu/roles",
    "title": "ai. Update all access role",
    "name": "GetSingleListTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/applications/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "delete",
    "url": "/teams/:id/volumes/:idu/roles/:ida",
    "title": "vl. Delete access role",
    "name": "GetSingleListVolumesTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/volumes/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "put",
    "url": "/teams/:id/volumes/:idu/roles",
    "title": "vi. Update all access role",
    "name": "GetSingleListVolumesTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/volumes/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "post",
    "url": "/teams/:id/volumes/:idu/roles",
    "title": "vh. Create access role",
    "name": "GetSingleListVolumesTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/volumes/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "put",
    "url": "/teams/:id/volumes/:idu/roles/:ida",
    "title": "vj. Update access role",
    "name": "GetSingleListVolumesTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/volumes/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/teams/:id/volumes/:idu",
    "title": "vc. Single Volumes for Team",
    "name": "GetSingleListVolumesTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/volumes/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "patch",
    "url": "/teams/:id/system/:idu/applications",
    "title": "sym. Add app system for teams",
    "name": "PatchAppInSystemTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/system/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "patch",
    "url": "/teams/:id/datacenters/:idu/sync_count_servers/",
    "title": "do. Sync servers",
    "name": "PatchSyncDcTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/datacenters/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "patch",
    "url": "/teams/:id/clients/:idu/system",
    "title": "clm. Add single system for teams",
    "name": "PatchSystemInTeamTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/clients/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "post",
    "url": "/teams/:id/clients/",
    "title": "clg. Create Clients for Team",
    "name": "PostSingleListClientsTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/clients/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "post",
    "url": "/teams/:id/connections/",
    "title": "ag. Create Conn for Team",
    "name": "PostSingleListConnTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/connections/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "post",
    "url": "/teams/:id/connections/:idu/task/:command",
    "title": "ag. Execute a command",
    "name": "PostSingleListConnTeamCommand",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/connections/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "post",
    "url": "/teams/:id/datacenters/",
    "title": "dg. Create Dcs for Team",
    "name": "PostSingleListDcsTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/datacenters/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "post",
    "url": "/teams/:id/flavors/",
    "title": "flg. Create Flavors for Team",
    "name": "PostSingleListFlavorsTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/flavors/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "post",
    "url": "/teams/:id/images/",
    "title": "ig. Create Images for Team",
    "name": "PostSingleListImagesTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/images/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "post",
    "url": "/teams/:id/network/",
    "title": "ng. Create Network for Team",
    "name": "PostSingleListNetworkTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/network/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "post",
    "url": "/teams/:id/servers/",
    "title": "sg. Create Servers for Team",
    "name": "PostSingleListServersTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/servers/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "post",
    "url": "/teams/:id/snapshots/",
    "title": "sng. Create Snapshots for Team",
    "name": "PostSingleListSnapshotsTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/snapshots/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "post",
    "url": "/teams/:id/system/",
    "title": "syg. Create System for Team",
    "name": "PostSingleListSystemTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/system/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "post",
    "url": "/teams/:id/applications/",
    "title": "ag. App for Team",
    "name": "PostSingleListTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/applications/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "post",
    "url": "/teams/:id/volumes/",
    "title": "vg. Create Volumes for Team",
    "name": "PostSingleListVolumesTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/volumes/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "put",
    "url": "/teams/:id/clients/:idu",
    "title": "cld. Update all Clients for Team",
    "name": "UpdateSingleListClientTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/clients/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "put",
    "url": "/teams/:id/connections/:idu",
    "title": "cd. Update all Conn for Team",
    "name": "UpdateSingleListConnTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/connections/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "put",
    "url": "/teams/:id/images/:idu",
    "title": "id. Update all Images for Team",
    "name": "UpdateSingleListImagesTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/images/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "put",
    "url": "/teams/:id/network/:idu",
    "title": "nd. Update all Network for Team",
    "name": "UpdateSingleListNetworkTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/network/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "put",
    "url": "/teams/:id/servers/:idu",
    "title": "sd. Update all Servers for Team",
    "name": "UpdateSingleListServersTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/servers/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "put",
    "url": "/teams/:id/snapshots/:idu",
    "title": "snd. Update all Snapshots for Team",
    "name": "UpdateSingleListSnapshotsTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/snapshots/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "put",
    "url": "/teams/:id/flavors/:idu",
    "title": "fld. Update all Flavors for Team",
    "name": "UpdateSingleListTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/flavors/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "put",
    "url": "/teams/:id/datacenters/:idu",
    "title": "dd. Update all Dcs for Team",
    "name": "UpdateSingleListTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/datacenters/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "put",
    "url": "/teams/:id/system/:idu",
    "title": "syd. Update all System for Team",
    "name": "UpdateSingleListTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/system/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "put",
    "url": "/teams/:id/applications/:idu",
    "title": "ad. Single App for Team",
    "name": "UpdateSingleListTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/applications/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "put",
    "url": "/teams/:id/volumes/:idu",
    "title": "vd. Update all Volumes for Team",
    "name": "UpdateSingleListVolumesTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/inventory/routers/volumes/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "delete",
    "url": "/volumes/:id/roles/:idu",
    "title": "l. Delete one role",
    "name": "DeleteRoleVolumes",
    "group": "Volumes",
    "description": "<p>Delete unique role.</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Volumes unique id.</p>"
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
    "filename": "app/inventory/routers/volumes/volumes.js",
    "groupTitle": "Volumes"
  },
  {
    "type": "delete",
    "url": "/volumes/:id",
    "title": "g. Delete single volume",
    "name": "DeleteSingleVolumes",
    "group": "Volumes",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Volume unique id.</p>"
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
    "filename": "app/inventory/routers/volumes/volumes.js",
    "groupTitle": "Volumes"
  },
  {
    "type": "get",
    "url": "/volumes/count",
    "title": "b. Count total volumes",
    "name": "GetCountVolumes",
    "group": "Volumes",
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
    "filename": "app/inventory/routers/volumes/volumes.js",
    "groupTitle": "Volumes"
  },
  {
    "type": "get",
    "url": "/volumes/:id",
    "title": "c. Get single volume",
    "name": "GetSingleVolumes",
    "group": "Volumes",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Volume unique id.</p>"
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
    "filename": "app/inventory/routers/volumes/volumes.js",
    "groupTitle": "Volumes"
  },
  {
    "type": "get",
    "url": "/volumes",
    "title": "a. List your volumes",
    "name": "GetVolumes",
    "group": "Volumes",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "Json",
            "optional": true,
            "field": "query",
            "description": "<p>Create a query to filters, the fields received some transformation. <br/></p> <pre class=\"prettyprint language-json\" data-type=\"json\"> <code>{ <br/>   \"name\": 'search by name' <br/>}  </code> </pre> <p><br/><b>Volumes don´t have modifications, only default regex filter:</b> <br/><i>{alias} = {query into mongodb}</i></p> <ul>     <li>field is string the querie execute a regex research like \"%filter%\", EX: {'name': 'serv'}, It will return result with name 'services58' or '754services'.</li> </ul>"
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
    "filename": "app/inventory/routers/volumes/volumes.js",
    "groupTitle": "Volumes"
  },
  {
    "type": "put",
    "url": "/volumes/:id",
    "title": "f. Full Update volume",
    "name": "PatchSingleVolumes",
    "group": "Volumes",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Volume unique id.</p>"
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
    "filename": "app/inventory/routers/volumes/volumes.js",
    "groupTitle": "Volumes"
  },
  {
    "type": "post",
    "url": "/volumes/:id/roles/",
    "title": "h. Add access Role",
    "name": "PostRoleVolumes",
    "group": "Volumes",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Volumes unique id.</p>"
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
    "filename": "app/inventory/routers/volumes/volumes.js",
    "groupTitle": "Volumes"
  },
  {
    "type": "post",
    "url": "/volumes/",
    "title": "d. Create single image",
    "name": "PostVolumes",
    "group": "Volumes",
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
            "type": "Number",
            "optional": false,
            "field": "size",
            "description": "<p>Size in GBs</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": true,
            "field": "encrypted",
            "description": "<p>Disk is encrypted</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": true,
            "field": "volume_id",
            "description": "<p>Id volume</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": true,
            "field": "iops",
            "description": "<p>IOPS</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": true,
            "field": "attach_time",
            "description": "<p>Time attachment</p>"
          },
          {
            "group": "Body x-www",
            "type": "Array",
            "optional": true,
            "field": "tags",
            "description": "<p>List of tags, [Array of Objects] <br/></p> <pre class=\"prettyprint language-json\" data-type=\"json\"> <code>[{ <br/>   \"key\": (String), <br/>   \"value\": (String) <br/>}]  </code> </pre>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": false,
            "field": "unique_id",
            "description": "<p>Unique name, normally use in Databases</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": true,
            "field": "status",
            "description": "<p>Status, [Active, Avaliable, Stopped]</p>"
          },
          {
            "group": "Body x-www",
            "type": "Object",
            "optional": true,
            "field": "datacenters",
            "description": "<p>Datacenter, normally used in third services <br/></p> <pre class=\"prettyprint language-json\" data-type=\"json\"> <code>{ <br/>   \"_id\": (String), <br/>   \"provider\": (String), <br/>   \"name\": (String) <br/>}  </code> </pre>"
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
    "filename": "app/inventory/routers/volumes/volumes.js",
    "groupTitle": "Volumes"
  },
  {
    "type": "put",
    "url": "/volumes/:id/roles",
    "title": "i. Update access role",
    "name": "PutRoleVolumes",
    "group": "Volumes",
    "description": "<p>Update all access roles, remember if you don´t send your access, after success you lose the access it´s</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Volumes unique id.</p>"
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
    "filename": "app/inventory/routers/volumes/volumes.js",
    "groupTitle": "Volumes"
  },
  {
    "type": "put",
    "url": "/volumes/:id/roles/:idu",
    "title": "j. Update specific access role",
    "name": "PutSingleRoleVolumes",
    "group": "Volumes",
    "description": "<p>Update access level one role to one volume</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Volume unique id.</p>"
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
          "content": "HTTP/1.1 202 OK\n{}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/inventory/routers/volumes/volumes.js",
    "groupTitle": "Volumes"
  },
  {
    "type": "patch",
    "url": "/volumes/:id",
    "title": "e. Update volume",
    "name": "PutSingleVolumes",
    "group": "Volumes",
    "description": "<p>Use patch to partial update.</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Volume unique id.</p>"
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
    "filename": "app/inventory/routers/volumes/volumes.js",
    "groupTitle": "Volumes"
  }
] });
