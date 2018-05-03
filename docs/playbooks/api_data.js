define({ "api": [
  {
    "type": "delete",
    "url": "/schedules/:id/roles/:idu",
    "title": "m. Delete one role",
    "name": "DeleteRoleSchedules",
    "group": "Schedules",
    "description": "<p>Delete unique role.</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Schedule unique id.</p>"
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
    "filename": "app/playbooks/routers/scheduler/scheduler.js",
    "groupTitle": "Schedules"
  },
  {
    "type": "delete",
    "url": "/schedules/:id",
    "title": "g. Delete single schedule",
    "name": "DeleteSingleSchedules",
    "group": "Schedules",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Schedule unique id.</p>"
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
    "filename": "app/playbooks/routers/scheduler/scheduler.js",
    "groupTitle": "Schedules"
  },
  {
    "type": "get",
    "url": "/schedules/:id",
    "title": "c. Get single schedule",
    "name": "Get_single_schedule_",
    "group": "Schedules",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Schedule unique id.</p>"
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
    "filename": "app/playbooks/routers/scheduler/scheduler.js",
    "groupTitle": "Schedules"
  },
  {
    "type": "get",
    "url": "/schedules/count",
    "title": "b. Count total schedules",
    "name": "Get_total_schedules_",
    "group": "Schedules",
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
    "filename": "app/playbooks/routers/scheduler/scheduler.js",
    "groupTitle": "Schedules"
  },
  {
    "type": "get",
    "url": "/schedules",
    "title": "a. List your schedule",
    "name": "List_all_active_schedule__have_a_posibility_to_use_filters__pagination__queries_and_etc_",
    "group": "Schedules",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "Json",
            "optional": true,
            "field": "query",
            "description": "<p>Create a query to filters, the fields received some transformation. <br/></p> <pre class=\"prettyprint language-json\" data-type=\"json\"> <code>{ <br/>   \"name\": 'search by name', <br/>   \"period_type\": 'search by type [interval|crontab]', <br/>   \"method\": 'search by method used [GET|POST|PUT|DELETE]', <br/>   \"task\": 'search by task [webhook|connections|jobs]', <br/>   \"total_run_count\": 'search by total runned', <br/>   \"max_run_count\": 'search by max run allowed' <br/>} </code> </pre> <p><br/><b>Schedule don´t have modifications, only default regex filter:</b> <br/><i>{alias} = {query into mongodb}</i></p> <ul>     <li>field is string the querie execute a regex research like \"%filter%\", EX: {'name': 'serv'}, It will return result with name 'services58' or '754services'.</li> </ul>"
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
            "field": "task",
            "description": "<p>Filter by task (webhook, connections, jobs).</p>"
          },
          {
            "group": "Param",
            "type": "String",
            "optional": true,
            "field": "period_type",
            "description": "<p>Filter by type (interval, crontab)</p>"
          },
          {
            "group": "Param",
            "type": "String",
            "optional": true,
            "field": "method",
            "description": "<p>Filter by method (get, post, put, delete)</p>"
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
    "filename": "app/playbooks/routers/scheduler/scheduler.js",
    "groupTitle": "Schedules"
  },
  {
    "type": "put",
    "url": "/schedules/:id",
    "title": "f. Full Update schedule",
    "name": "PatchSingleSchedules",
    "group": "Schedules",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Schedule unique id.</p>"
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
    "filename": "app/playbooks/routers/scheduler/scheduler.js",
    "groupTitle": "Schedules"
  },
  {
    "type": "post",
    "url": "/schedules/:id/roles/",
    "title": "i. Add access Role",
    "name": "PostRoleSchedules",
    "group": "Schedules",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Schedule unique id.</p>"
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
    "filename": "app/playbooks/routers/scheduler/scheduler.js",
    "groupTitle": "Schedules"
  },
  {
    "type": "post",
    "url": "/schedules/",
    "title": "d. Create single schedule",
    "name": "PostSchedules",
    "group": "Schedules",
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
            "field": "task",
            "description": "<p>Task (webhook, connections, jobs)</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": false,
            "field": "period_type",
            "description": "<p>Choose one period (interval, crontab)</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": false,
            "field": "method",
            "description": "<p>HTTP method (get, post, put, delete)</p>"
          },
          {
            "group": "Body x-www",
            "type": "Array",
            "optional": true,
            "field": "args",
            "description": "<p>Args <code>[ <br/>   &quot;key&quot;: 'name', <br/>   &quot;value&quot;: 'value' <br/>] </code></p>"
          },
          {
            "group": "Body x-www",
            "type": "Object",
            "optional": true,
            "field": "kwargs",
            "description": "<p>Scheduler configuration</p>"
          },
          {
            "group": "Body x-www",
            "type": "Array",
            "optional": true,
            "field": "chain",
            "description": "<p>Chain schedulers <code>{ <br/>   &quot;name&quot;: 'name', <br/>   &quot;_id&quot;: 'id scheduler', <br/>   &quot;countdown&quot;: 'wait time before execute' <br/>} </code></p>"
          },
          {
            "group": "Body x-www",
            "type": "Object",
            "optional": true,
            "field": "link",
            "description": "<p>Detail of Modules <code>{ <br/>   &quot;name&quot;: 'name', <br/>   &quot;provider&quot;: 'provider (AWS)', <br/>   &quot;_id&quot;: 'refs id, used by modules', <br/>   &quot;task&quot;: 'search by task [webhook|connections|jobs]' <br/>} </code></p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": true,
            "field": "_cls",
            "description": "<p>Internal Crontoller [PeriodTask]</p>"
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
    "filename": "app/playbooks/routers/scheduler/scheduler.js",
    "groupTitle": "Schedules"
  },
  {
    "type": "post",
    "url": "/schedules/template",
    "title": "h. Create a template scheduler",
    "name": "PostTemplateSchedules",
    "group": "Schedules",
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
            "field": "_id",
            "description": "<p>Id [Module id]</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": false,
            "field": "provider",
            "description": "<p>Provider name [AWS, OpenStack]</p>"
          },
          {
            "group": "Body x-www",
            "type": "String",
            "optional": false,
            "field": "refs",
            "description": "<p>Module name [connections]</p>"
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
    "filename": "app/playbooks/routers/scheduler/scheduler.js",
    "groupTitle": "Schedules"
  },
  {
    "type": "put",
    "url": "/schedules/:id/roles",
    "title": "j. Update access role",
    "name": "PutRoleSchedules",
    "group": "Schedules",
    "description": "<p>Update all access roles, remember if you don´t send your access, after success you lose the access it´s</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Schedule unique id.</p>"
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
    "filename": "app/playbooks/routers/scheduler/scheduler.js",
    "groupTitle": "Schedules"
  },
  {
    "type": "put",
    "url": "/schedules/:id/roles/:idu",
    "title": "l. Update specific access role",
    "name": "PutSingleRoleSchedules",
    "group": "Schedules",
    "description": "<p>Update access level one role to one schedule</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Schedule unique id.</p>"
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
    "filename": "app/playbooks/routers/scheduler/scheduler.js",
    "groupTitle": "Schedules"
  },
  {
    "type": "patch",
    "url": "/schedules/:id",
    "title": "e. Update schedule",
    "name": "PutSingleSchedules",
    "group": "Schedules",
    "description": "<p>Use patch to partial update.</p>",
    "parameter": {
      "fields": {
        "Param": [
          {
            "group": "Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Schedule unique id.</p>"
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
    "filename": "app/playbooks/routers/scheduler/scheduler.js",
    "groupTitle": "Schedules"
  },
  {
    "type": "delete",
    "url": "/teams/:id/schedules/:idu",
    "title": "sf. Single schedules for Team",
    "name": "DeleteSingleListSchedulesTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/playbooks/routers/scheduler/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "delete",
    "url": "/teams/:id/members/:idu",
    "title": "Delete member team",
    "name": "Delete_Single_Member_of_Team",
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
    "filename": "app/playbooks/routers/access_manager/access_manager.js",
    "groupTitle": "Teams"
  },
  {
    "type": "delete",
    "url": "/teams/:id",
    "title": "Delete team",
    "name": "Delete_Single_Team",
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
    "filename": "app/playbooks/routers/access_manager/access_manager.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/teams/:id/schedules/count",
    "title": "sb. Count schedules for Team",
    "name": "GetCountListSchedulesTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/playbooks/routers/scheduler/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/teams/:id/schedules",
    "title": "sa. List schedules for Team",
    "name": "GetListSchedules",
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
    "filename": "app/playbooks/routers/scheduler/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "patch",
    "url": "/teams/:id/schedules/:idu",
    "title": "se. Partial schedules for Team",
    "name": "GetPartialSingleListSchedulesTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/playbooks/routers/scheduler/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "put",
    "url": "/teams/:id/schedules/:idu/roles/:ida",
    "title": "sj. Update access role",
    "name": "GetSingleListSchedulesTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/playbooks/routers/scheduler/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "delete",
    "url": "/teams/:id/schedules/:idu/roles/:ida",
    "title": "sl. Delete access role",
    "name": "GetSingleListSchedulesTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/playbooks/routers/scheduler/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "post",
    "url": "/teams/:id/schedules/:idu/roles",
    "title": "sh. Create access role",
    "name": "GetSingleListSchedulesTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/playbooks/routers/scheduler/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "put",
    "url": "/teams/:id/schedules/:idu/roles",
    "title": "si. Update all access role",
    "name": "GetSingleListSchedulesTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/playbooks/routers/scheduler/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/teams/:id/schedules/:idu",
    "title": "sc. Single schedules for Team",
    "name": "GetSingleListschedulesTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/playbooks/routers/scheduler/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/teams/:id",
    "title": "Get team information",
    "name": "Get_Single_Team",
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
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"firstname\": \"John\",\n  \"lastname\": \"Doe\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/playbooks/routers/access_manager/access_manager.js",
    "groupTitle": "Teams"
  },
  {
    "type": "get",
    "url": "/teams/:id",
    "title": "Get list of yours teams",
    "name": "Get_Teams",
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
          "content": "HTTP/1.1 200 OK\n{\n  \"firstname\": \"John\",\n  \"lastname\": \"Doe\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/playbooks/routers/access_manager/access_manager.js",
    "groupTitle": "Teams"
  },
  {
    "type": "post",
    "url": "/teams/:id/schedules/",
    "title": "sg. Create schedules for Team",
    "name": "PostSingleListSchedulesTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/playbooks/routers/scheduler/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "post",
    "url": "/teams/:id/schedules/",
    "title": "sg. Create schedules for Team",
    "name": "PostSingleListSchedulesTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/playbooks/routers/scheduler/index.js",
    "groupTitle": "Teams"
  },
  {
    "type": "put",
    "url": "/teams/:id/schedules/:idu",
    "title": "sd. Update all schedules for Team",
    "name": "UpdateSingleListschedulesTeam",
    "group": "Teams",
    "version": "0.0.0",
    "filename": "app/playbooks/routers/scheduler/index.js",
    "groupTitle": "Teams"
  }
] });
