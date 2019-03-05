'use strict';

const _ = require('lodash');

const template = {
    "name": "app",
    "status": "Active",
    "family": "Application",
    "size": "medium",
    "role": {},
    "tags": [],
    "system": []
};


const merge = [
    {
        "name": "WebClient SPA Maestro",
        "family": "Application",
        "environment": "Production",
        "language": "JavaScript (Single Page Application)",
        "cluster": "12 Factor",
        "description": "SPA application - Stack stack: VueJs, WebPack and Gulp",
        "role": {
            "role": "Application",
            "ports": 8880,
            "endpoint": "http://maestroserver.io",
            "path": "/home/maestro/www/client",
            "code": "docker run -p 80:8080 client-maestro"
        },
        "tags": [
            {
                "key": "cost-id",
                "value": "ds6ftsdfgdsuyjv"
            },
            {
                "key": "environment",
                "value": "production"
            }
        ],
        "deploy": [
            {
                "type": "Continuos Integration (CI)",
                "provider": "TravisCI",
                "notes": "Automatic after each Push"
            },
            {
                "type": "Continuos Deployment (CD)",
                "provider": "Docker Compose",
                "notes": "docker-compose up client-maestro"
            },
            {
                "type": "Git (Github, Bibucket)",
                "provider": "GitHUB",
                "notes": "https://github.com/maestro-server/client-app"
            }
        ],
        "own": 0,
        "system": ["#name::Maestro - Client"]
    },

    {
        "name": "WebServer Maestro",
        "family": "Application",
        "environment": "Production",
        "language": "NodeJs",
        "cluster": "12 Factor",
        "role": {
            "role": "Application",
            "ports": 8888,
            "endpoint": "http://api.maestroserver.io",
            "path": "/home/maestro/www/server",
            "code": "docker run -p 8888:8888 server-maestro"
        },
        "tags": [
            {
                "key": "cost-id",
                "value": "ds6ftsdfgdsuyjv"
            },
            {
                "key": "environment",
                "value": "production"
            }
        ],
        "deploy": [
            {
                "type": "Continuos Integration (CI)",
                "provider": "TravisCI",
                "notes": "Automatic after each Push"
            },
            {
                "type": "Continuos Deployment (CD)",
                "provider": "Docker Compose",
                "notes": "docker-compose up server-maestro"
            },
            {
                "type": "Git (Github, Bibucket)",
                "provider": "GitHUB",
                "notes": "https://github.com/maestro-server/server-app"
            }
        ],
        "own": 0,
        "system": ["#name::Maestro - Servers"]
    },

    {
        "name": "Discovery API",
        "family": "Application",
        "environment": "Production",
        "language": "Python",
        "cluster": "12 Factor",
        "description": "Discovery App service to connect and crawler provider.",
        "role": {
            "role": "Application",
            "ports": 5000,
            "endpoint": "http://api.maestroserver.io",
            "path": "/home/maestro/www/discovery",
            "code": "docker run -p 5000:5000 discovery-maestro"
        },
        "tags": [
            {
                "key": "cost-id",
                "value": "ds6ftsdfgdsuyjv"
            },
            {
                "key": "environment",
                "value": "production"
            }
        ],
        "deploy": [
            {
                "type": "Continuos Integration (CI)",
                "provider": "TravisCI",
                "notes": "Automatic after each Push"
            },
            {
                "type": "Continuos Deployment (CD)",
                "provider": "Docker Compose",
                "notes": "docker-compose up discovery-maestro"
            },
            {
                "type": "Git (Github, Bibucket)",
                "provider": "GitHUB",
                "notes": "https://github.com/maestro-server/discovery-app"
            }
        ],
        "own": 0,
        "system": ["#name::Maestro - Discovery"]
    },
    {
        "name": "Discovery Workers",
        "family": "Application",
        "environment": "Production",
        "language": "Python",
        "cluster": "12 Factor",
        "description": "Discovery Workers - Celery.",
        "role": {
            "role": "Worker",
            "path": "/home/maestro/www/discovery",
            "code": "celery -A app.celery worker -E -Q discovery --hostname=discovery@%h --loglevel=info"
        },
        "tags": [
            {
                "key": "cost-id",
                "value": "ds6ftsdfgdsuyjv"
            },
            {
                "key": "role",
                "value": "worker"
            }
        ],
        "deploy": [
            {
                "type": "Continuos Integration (CI)",
                "provider": "TravisCI",
                "notes": "Automatic after each Push"
            },
            {
                "type": "Git (Github, Bibucket)",
                "provider": "GitHUB",
                "notes": "https://github.com/maestro-server/discovery-app"
            }
        ],
        "own": 0,
        "system": ["#name::Maestro - Discovery"]
    },


    {
        "name": "Reports API",
        "family": "Application",
        "environment": "Production",
        "language": "Python",
        "cluster": "12 Factor",
        "description": "Reports app, generate reports.",
        "role": {
            "role": "Application",
            "ports": 5005,
            "endpoint": "http://api.maestroserver.io",
            "path": "/home/maestro/www/reports",
            "code": "docker run -p 5005:5005 reports-maestro"
        },
        "tags": [
            {
                "key": "cost-id",
                "value": "ds6ftsdfgdsuyjv"
            },
            {
                "key": "environment",
                "value": "production"
            }
        ],
        "deploy": [
            {
                "type": "Continuos Integration (CI)",
                "provider": "TravisCI",
                "notes": "Automatic after each Push"
            },
            {
                "type": "Continuos Deployment (CD)",
                "provider": "Docker Compose",
                "notes": "docker-compose up reports-maestro"
            },
            {
                "type": "Git (Github, Bibucket)",
                "provider": "GitHUB",
                "notes": "https://github.com/maestro-server/report-app"
            }
        ],
        "own": 0,
        "system": ["#name::Maestro - Reports"]
    },
    {
        "name": "Reports Workers",
        "family": "Application",
        "environment": "Production",
        "language": "Python",
        "cluster": "12 Factor",
        "description": "Reports Workers - Celery.",
        "role": {
            "role": "Worker",
            "path": "/home/maestro/www/reports",
            "code": "celery -A app.celery worker -E -Q reports --hostname=reports@%h --loglevel=info"
        },
        "tags": [
            {
                "key": "cost-id",
                "value": "ds6ftsdfgdsuyjv"
            },
            {
                "key": "role",
                "value": "worker"
            }
        ],
        "deploy": [
            {
                "type": "Continuos Integration (CI)",
                "provider": "TravisCI",
                "notes": "Automatic after each Push"
            },
            {
                "type": "Git (Github, Bibucket)",
                "provider": "GitHUB",
                "notes": "https://github.com/maestro-server/report-app"
            }
        ],
        "own": 0,
        "system": ["#name::Maestro - Reports"]
    },

    {
        "name": "Analytics API",
        "family": "Application",
        "environment": "Production",
        "language": "Python",
        "cluster": "12 Factor",
        "description": "Analytics App is a module to analytics graph and create xml of Maestro Server.",
        "role": {
            "role": "Application",
            "ports": 5020,
            "endpoint": "http://api.maestroserver.io",
            "path": "/home/maestro/www/analytics",
            "code": "docker run -p 5020:5020 analytics-maestro"
        },
        "tags": [
            {
                "key": "cost-id",
                "value": "ds6ftsdfgdsuyjv"
            },
            {
                "key": "environment",
                "value": "production"
            }
        ],
        "deploy": [
            {
                "type": "Continuos Integration (CI)",
                "provider": "TravisCI",
                "notes": "Automatic after each Push"
            },
            {
                "type": "Continuos Deployment (CD)",
                "provider": "Docker Compose",
                "notes": "docker-compose up analytics-maestro"
            },
            {
                "type": "Git (Github, Bibucket)",
                "provider": "GitHUB",
                "notes": "https://github.com/maestro-server/analytics-maestro"
            }
        ],
        "own": 0,
        "system": ["#name::Maestro - Analytics"]
    },
    {
        "name": "Analytics Workers",
        "family": "Application",
        "environment": "Production",
        "language": "Python",
        "cluster": "12 Factor",
        "description": "Analytics Workers - Celery.",
        "role": {
            "role": "Worker",
            "path": "/home/maestro/www/analytics",
            "code": "celery -A app.celery worker -E -Q analytics --hostname=analytics@%h --loglevel=info"
        },
        "tags": [
            {
                "key": "cost-id",
                "value": "ds6ftsdfgdsuyjv"
            },
            {
                "key": "role",
                "value": "worker"
            }
        ],
        "deploy": [
            {
                "type": "Continuos Integration (CI)",
                "provider": "TravisCI",
                "notes": "Automatic after each Push"
            },
            {
                "type": "Git (Github, Bibucket)",
                "provider": "GitHUB",
                "notes": "https://github.com/maestro-server/analytics-maestro"
            }
        ],
        "own": 0,
        "system": ["#name::Maestro - Analytics"]
    },

    {
        "name": "Analytics Front",
        "family": "Application",
        "environment": "Production",
        "language": "NodeJs",
        "cluster": "12 Factor",
        "description": "FrontEnd of charts and graphs.",
        "role": {
            "role": "Application",
            "ports": 9999,
            "endpoint": "http://api.maestroserver.io:9999",
            "path": "/home/maestro/www/analytics-front",
            "code": "docker run -p 9999:9999 analytics-front-maestro"
        },
        "tags": [
            {
                "key": "cost-id",
                "value": "ds6ftsdfgdsuyjv"
            }
        ],
        "deploy": [
            {
                "type": "Continuos Integration (CI)",
                "provider": "TravisCI",
                "notes": "Automatic after each Push"
            },
            {
                "type": "Git (Github, Bibucket)",
                "provider": "GitHUB",
                "notes": "https://github.com/maestro-server/analytics-front"
            }
        ],
        "own": 0,
        "system": ["#name::Maestro - Analytics"]
    },

    {
        "name": "Audit API",
        "family": "Application",
        "environment": "Production",
        "language": "NodeJs",
        "cluster": "12 Factor",
        "description": "Audit App is webapp application port of Maestro Server stack.",
        "role": {
            "role": "Application",
            "ports": 10900,
            "endpoint": "http://api.maestroserver.io:10900",
            "path": "/home/maestro/www/audit",
            "code": "docker run -p 10900:10900 audit-maestro"
        },
        "tags": [
            {
                "key": "cost-id",
                "value": "ds6ftsdfgdsuyjv"
            }
        ],
        "deploy": [
            {
                "type": "Continuos Integration (CI)",
                "provider": "TravisCI",
                "notes": "Automatic after each Push"
            },
            {
                "type": "Git (Github, Bibucket)",
                "provider": "GitHUB",
                "notes": "https://github.com/maestro-server/audit-app"
            }
        ],
        "own": 0,
        "system": ["#name::Maestro - Audit"]
    },

    {
        "name": "Data API",
        "family": "Application",
        "environment": "Production",
        "language": "Python",
        "cluster": "12 Factor",
        "description": "Data app, database gateway micro service - Request and response database operations.",
        "role": {
            "role": "Application",
            "ports": 5010,
            "endpoint": "http://api.maestroserver.io",
            "path": "/home/maestro/www/data",
            "code": "docker run -p 5010:5010 data-maestro"
        },
        "tags": [
            {
                "key": "cost-id",
                "value": "ds6ftsdfgdsuyjv"
            }
        ],
        "deploy": [
            {
                "type": "Continuos Integration (CI)",
                "provider": "TravisCI",
                "notes": "Automatic after each Push"
            },
            {
                "type": "Git (Github, Bibucket)",
                "provider": "GitHUB",
                "notes": "https://github.com/maestro-server/data-app"
            }
        ],
        "own": 0,
        "system": ["#name::Maestro - Data"]
    },

    {
        "name": "WebSocket API",
        "family": "Application",
        "environment": "Production",
        "language": "Go",
        "cluster": "No",
        "description": "It’s websocket server with restfull hooks, maestro websocket use centrifugo project. - Client notification using webscokets.",
        "role": {
            "role": "Standard",
            "ports": 8000,
            "endpoint": "http://api.maestroserver.io:8000",
            "path": "/home/maestro/www/ws",
            "code": "docker run -p 8000:8000 ws-maestro"
        },
        "tags": [
            {
                "key": "cost-id",
                "value": "ds6ftsdfgdsuyjv"
            }
        ],
        "deploy": [
            {
                "type": "Continuos Integration (CI)",
                "provider": "TravisCI",
                "notes": "Automatic after each Push"
            },
            {
                "type": "Git (Github, Bibucket)",
                "provider": "GitHUB",
                "notes": "https://github.com/maestro-server/websocket-app"
            }
        ],
        "own": 0,
        "system": ["#name::Maestro - WS"]
    },

    {
        "name": "WebDocs - Read the docs",
        "family": "Application",
        "environment": "Production",
        "language": "HTML (Static files)",
        "cluster": "No",
        "description": "Webdocs - Read the Docs.",
        "role": {
            "role": "Standard",
            "endpoint": "http://docs.maestroserver.io",
            "code": "make html"
        },
        "tags": [
            {
                "key": "cost-id",
                "value": "ds6ftsdfgdsuyjv"
            }
        ],
        "deploy": [
            {
                "type": "Continuos Integration (CI)",
                "provider": "TravisCI",
                "notes": "Automatic after each Push"
            },
            {
                "type": "Git (Github, Bibucket)",
                "provider": "GitHUB",
                "notes": "https://github.com/maestro-server/webdocs"
            }
        ],
        "system": ["#name::Maestro - Managers"]
    },
    {
        "name": "Landing Pages",
        "family": "Application",
        "environment": "Production",
        "language": "HTML (Static files)",
        "cluster": "No",
        "description": "S3 Static pages",
        "role": {
            "role": "Standard",
            "endpoint": "http://maestroserver.io"
        },
        "tags": [
            {
                "key": "cost-id",
                "value": "ds6ftsdfgdsuyjv"
            }
        ],
        "deploy": [
            {
                "type": "Continuos Integration (CI)",
                "provider": "TravisCI",
                "notes": "Automatic after each Push send to S3 AWS"
            },
            {
                "type": "Git (Github, Bibucket)",
                "provider": "GitHUB",
                "notes": "https://github.com/maestro-server/landing"
            }
        ],
        "system": ["#name::LandingPages"]
    },

    {
        "datacenters": "#name::AWS - US East/West",
        "family": "Broker",
        "name": "SQS - XXX",
        "own": 1,
        "provider": "SQS (AWS)",
        "size": "medium",
        "environment": "Production",
        "queues": [
            "analytics",
            "discovery",
            "reports",
            "scheduler"
        ],
        "urls": [
            "https://queue.amazonaws.com/XXX/analytics",
            "https://queue.amazonaws.com/XXX/discovery",
            "https://queue.amazonaws.com/XXX/reports",
            "https://queue.amazonaws.com/XXX/scheduler"
        ]
    },

    {
        "family": "Broker",
        "name": "RabbitMQ - Dev",
        "own": 0,
        "provider": "RabbitMQ",
        "size": "medium",
        "environment": "Development",
        "queues": [
            "analytics",
            "discovery",
            "reports",
            "scheduler"
        ]
    },

    {
        "datacenters": "#name::AWS - US East/West",
        "domain": [
            "maestroserver.io",
            "maestro@maestroserver.io"
        ],
        "family": "SMTP",
        "name": "SES - SMTP",
        "own": 1,
        "size": "small",
        "environment": "Production",
        "provider": "SES (AWS)"
    },

    {
        "datacenters": "#name::AWS - US East/West",
        "domain": [
            "marketing.maestroserver.io",
            "maestro@maestroserver.io"
        ],
        "family": "SMTP",
        "name": "SendGrid - SMTP",
        "own": 1,
        "size": "large",
        "environment": "Production",
        "provider": "SendGrid"
    },

    {
        "datacenters": "#name::AWS - US East/West",
        "family": "CDN",
        "size": "xlarge",
        "name": "CloudFront - AWS",
        "own": 1,
        "environment": "Production",
        "provider": "CloudFront (AWS)"
    },

    {
        "datacenters": "#name::AWS - US East/West",
        "family": "DNS",
        "size": "xlarge",
        "name": "Route 53 - AWS",
        "own": 1,
        "environment": "Production",
        "provider": "Route53 (AWS)"
    },

    {
        "datacenters": "#name::AWS - US East/West",
        "family": "Cache",
        "size": "2xlarge",
        "name": "Redis - AWS",
        "own": 1,
        "environment": "Production",
        "provider": "Elastic Cache (AWS)"
    },

    {
        "family": "Cache",
        "name": "Redis - Development",
        "own": 0,
        "environment": "Development",
        "provider": "Redis",
        "role": {
            "endpoint": "http://10.10.10.10:36000"
        }
    },

    {
        "datacenters": "#name::AWS - US East/West",
        "family": "ObjectStorage",
        "name": "awsmaestro",
        "environment": "Production",
        "own": 1,
        "provider": "S3 (AWS)",
    },
    {
        "datacenters": "#name::AWS - US East/West",
        "family": "ObjectStorage",
        "name": "terraform-statefiles",
        "environment": "Production",
        "own": 1,
        "provider": "S3 (AWS)",
    },
    {
        "datacenters": "#name::AWS - US East/West",
        "family": "ObjectStorage",
        "name": "staticfiles-maestroserver",
        "environment": "Production",
        "own": 1,
        "provider": "S3 (AWS)",
    },

    {
        "datacenters": "#name::AWS - US East/West",
        "name": "lb-client-maestro-prd",
        "family": "Loadbalance",
        "environment": "Production",
        "provider": "ELB (AWS)",
        "own": 1,
        "size": "medium",
        "role": {
            "endpoint": "https://234k2j3b42j3b.awsendpoint.com",
            "healthcheck": "/health"
        }
    },
    {
        "datacenters": "#name::AWS - US East/West",
        "name": "lb-server-maestro-prd",
        "family": "Loadbalance",
        "environment": "Production",
        "provider": "ELB (AWS)",
        "own": 1,
        "size": "xlarge",
        "role": {
            "endpoint": "https://23423jg4vvcxcvx.awsendpoint.com",
            "healthcheck": "/health"
        }
    },
    {
        "datacenters": "#name::AWS - US East/West",
        "name": "lb-audit-maestro-prd",
        "family": "Loadbalance",
        "environment": "Production",
        "provider": "ELB (AWS)",
        "own": 1,
        "size": "large",
        "role": {
            "endpoint": "https://3242342sdfsdfs.awsendpoint.com",
            "healthcheck": "/health"
        }
    },
    {
        "datacenters": "#name::AWS - US East/West",
        "name": "lb-auditfront-maestro-prd",
        "family": "Loadbalance",
        "environment": "Production",
        "provider": "ELB (AWS)",
        "own": 1,
        "size": "large",
        "role": {
            "endpoint": "https://43uhr4334udsav.awsendpoint.com",
            "healthcheck": "/health"
        }
    },

    {
        "name": "DB - MongoDB",
        "status": "Active",
        "family": "Database",
        "environment": "Production",
        "provider": "MongoCloud",
        "size": "large",
        "role": {
            "endpoint": "mongodb://as5dasdt7q.cluestermongodb.com",
            "port": 27027
        },
        "cluster": "Master/Replica",
        "type": "Document Store",
        "tags": [
            {
                "key": "cost-id",
                "value": "ds6ftsdfgdsuyjv"
            },
            {
                "key": "environment",
                "value": "production"
            }
        ],
        "own": 1,
        "system": ["#name::Maestro - Servers", "#name::Maestro - Analytics", "#name::Maestro - Data"]
    },
    {
        "name": "DB - MongoDB [Staging]",
        "datacenters": "#name::AWS - US East/West",
        "status": "Active",
        "family": "Database",
        "environment": "Staging",
        "provider": "mongoDB",
        "size": "small",
        "role": {
            "endpoint": "mongodb://kbj3467.maestrostaging.env",
            "port": 27027
        },
        "cluster": "Single Instance",
        "type": "Document Store",
        "tags": [
            {
                "key": "cost-id",
                "value": "ds6ftsdfgdsuyjv"
            }
        ],
        "own": 0,
        "system": ["#name::Maestro - Servers", "#name::Maestro - Analytics", "#name::Maestro - Data"]
    },
    {
        "name": "DB - MongoDB [Developing]",
        "datacenters": "#name::AWS - US East/West",
        "status": "Active",
        "family": "Database",
        "environment": "Development",
        "provider": "mongoDB",
        "size": "small",
        "role": {
            "endpoint": "mongodb://763ghjjhhj.maestrodev.env",
            "port": 27027
        },
        "cluster": "Single Instance",
        "type": "Document Store",
        "tags": [
            {
                "key": "cost-id",
                "value": "ds6ftsdfgdsuyjv"
            }
        ],
        "own": 0,
        "system": ["#name::Maestro - Servers", "#name::Maestro - Analytics", "#name::Maestro - Data"]
    },
    {
        "name": "Travis",
        "status": "Active",
        "family": "CI/CD",
        "environment": "Production",
        "provider": "Travis",
        "size": "small",
        "role": {
            "endpoint": "https://travis-ci.org/maestro-server"
        },
        "tags": [
            {
                "key": "cost-id",
                "value": "ds6ftsdfgdsuyjv"
            }
        ],
        "own": 1,
        "system": ["#name::Maestro - Managers"]
    },
    {
        "name": "DockerHub",
        "status": "Active",
        "family": "Repository",
        "environment": "Production",
        "provider": "DockerHub",
        "size": "small",
        "role": {
            "endpoint": "https://hub.docker.com/"
        },
        "tags": [
            {
                "key": "cost-id",
                "value": "ds6ftsdfgdsuyjv"
            }
        ],
        "own": 1,
        "system": ["#name::Maestro - Managers"]
    },

    {
        "name": "ASM - Manager",
        "family": "Database",
        "environment": "Production",
        "provider": "Oracle Database",
        "size": "large",
        "role": {},
        "asm_groups": [
            {
                "name": "asm-group",
                "size": 100
            },
            {
                "name": "as2-group",
                "size": 100
            }
        ],
        "cluster": "RAC",
        "dataguard": "Primary",
        "type": "Storage (ASM/ACFS)",
        "crs_version": "123.00",
        "modal": "oracle",
        "status": "Active",
        "own": 0,
        "system": ['#name::ERP - Spring'],
    },

    {
        "name": "Oracle - ERP - Prd",
        "status": "Active",
        "family": "Database",
        "provider": "Oracle Database",
        "size": "2xlarge",
        "role": {},
        "cluster": "RAC",
        "dataguard": "Primary",
        "type": "Application",
        "storage_types": "ASM",
        "modal": "oracle",
        "own": 0,
        "pdbs": [
            {
                "name": "cdb-1"
            },
            {
                "name": "cdb-2"
            }
        ],
        "system": ['#name::ERP - Spring']
    },

    {
        "family": "CDN",
        "size": "xlarge",
        "name": "CloudFlare - Hotsites",
        "own": 1,
        "environment": "Production",
        "provider": "CloudFlare"
    },

    {
        "name": "MySQL - HotSites - Prd",
        "status": "Active",
        "family": "Database",
        "environment": "Production",
        "provider": "Aurora (AWS)",
        "own": 1,
        "size": "large",
        "role": {
            "endpoint": "sdasudayuytu.aurora.com",
            "port": "3306"
        },
        "cluster": "Master/Replica",
        "modal": "mysql",
        "system": ['#name::Hotsites'],
    },

    {
        "name": "WebApp - ERP",
        "family": "Application",
        "environment": "Production",
        "language": "OpenJDK (Java)",
        "cluster": "No",
        "description": "Internal ERP.",
        "role": {
            "role": "Application",
            "path": "/home/erp/www/erp",
            "code": "java -jar erp.jar"
        },
        "tags": [
            {
                "key": "cost-id",
                "value": "88asdhas"
            },
            {
                "key": "role",
                "value": "application"
            }
        ],
        "deploy": [
            {
                "type": "FTP",
                "provider": "FileZilla"
            },
            {
                "type": "Git (Github, Bibucket)",
                "provider": "GitHUB",
                "notes": "https://local.gitlab.env/my-erp"
            }
        ],
        "system": ["#name::ERP - Spring"]
    },

    {
        "name": "Hotsites",
        "family": "Application",
        "environment": "Production",
        "language": "PHP",
        "cluster": "No",
        "description": "HotiSite.",
        "role": {
            "role": "Application"
        },
        "tags": [
            {
                "key": "cost-id",
                "value": "ohdhsdfs"
            }
        ],
        "deploy": [
            {
                "type": "FTP",
                "provider": "FileZilla"
            },
            {
                "type": "Git (Github, Bibucket)",
                "provider": "GitHUB",
                "notes": "https://local.gitlab.env/hotsites"
            }
        ],
        "system": ["#name::Hotsites"]
    },
    {
        "name": "Lambda - Order Catalog",
        "status": "Active",
        "family": "Serverless",
        "environment": "Production",
        "provider": "Lambda (AWS)",
        "size": "xlarge",
        "role": {
            "memory": 500,
            "timeout": 1000,
            "handler": "HANDLER::xxx"
        },
        "own": 1,
        "system": ["#name::ChatBot - Order"],
        "datacenters": "#name::AWS - US East/West"
    },
    {
        "name": "Lambda - Order Fullfilment",
        "status": "Active",
        "family": "Serverless",
        "environment": "Production",
        "provider": "Lambda (AWS)",
        "size": "large",
        "role": {
            "memory": 100,
            "timeout": 1000,
            "handler": "HANDLER::xxx"
        },
        "own": 1,
        "system": ["#name::ChatBot - Order"],
        "datacenters": "#name::AWS - US East/West"
    },
    {
        "name": "Lambda - Handler Error",
        "status": "Active",
        "family": "Serverless",
        "environment": "Production",
        "provider": "Lambda (AWS)",
        "size": "small",
        "role": {
            "memory": 20,
            "timeout": 300,
            "handler": "HANDLER::xxx"
        },
        "own": 1,
        "system": ["#name::ChatBot - Order"],
        "datacenters": "#name::AWS - US East/West"
    },
    {
        "name": "Lambda - Order Outage",
        "status": "Active",
        "family": "Serverless",
        "environment": "Production",
        "provider": "Lambda (AWS)",
        "size": "medium",
        "role": {
            "memory": 100,
            "timeout": 1000,
            "handler": "HANDLER::xxx"
        },
        "own": 1,
        "system": ["#name::ChatBot - Order"],
        "datacenters": "#name::AWS - US East/West"
    },
    {
        "name": "Lambda - Parsers",
        "status": "Active",
        "family": "Serverless",
        "environment": "Production",
        "provider": "Lambda (AWS)",
        "size": "xlarge",
        "role": {
            "memory": 500,
            "timeout": 1000,
            "handler": "HANDLER::xxx"
        },
        "own": 1,
        "system": ["#name::ChatBot - Order"],
        "datacenters": "#name::AWS - US East/West"
    },
    {
        "name": "Lambda - Register",
        "status": "Active",
        "family": "Serverless",
        "environment": "Production",
        "provider": "Lambda (AWS)",
        "size": "large",
        "role": {
            "memory": 300,
            "timeout": 500,
            "handler": "HANDLER::xxx"
        },
        "own": 1,
        "system": ["#name::ChatBot - Order"],
        "datacenters": "#name::AWS - US East/West"
    },
    {
        "name": "API Gateway - Bot",
        "status": "Active",
        "family": "ApiGateway",
        "environment": "Production",
        "provider": "ApiGateway (AWS)",
        "size": "xlarge",
        "role": {
            "endpoint": "http://myapi.gateway.bot.com"
        },
        "own": 1,
        "system": ["#name::ChatBot - Order"],
        "datacenters": "#name::AWS - US East/West"
    },
    {
        "name": "IA - NPL - ChatBot",
        "status": "Active",
        "family": "MachineLearning",
        "environment": "Production",
        "provider": "Lex (AWS)",
        "size": "xlarge",
        "role": {
            "endpoint": "http://myapi.lex.bot.com"
        },
        "own": 1,
        "system": ["#name::ChatBot - Order"],
        "datacenters": "#name::AWS - US East/West"
    },
    {
        "name": "ChatBot - Slack",
        "status": "Active",
        "family": "MachineLearning",
        "environment": "Production",
        "provider": "Slack",
        "size": "large",
        "role": {
            "endpoint": "http://chatbot.slack"
        },
        "own": 1,
        "system": ["#name::ChatBot - Order"],
        "datacenters": "#name::AWS - US East/West"
    },
    {
        "name": "DB - Order",
        "status": "Active",
        "family": "Database",
        "environment": "Production",
        "provider": "DynamoDB  (AWS)",
        "size": "8xlarge",
        "own": 1,
        "system": ["#name::ChatBot - Order"],
        "datacenters": "#name::AWS - US East/West"
    },
    {
        "name": "Autheticator - Order",
        "status": "Active",
        "family": "Auth",
        "environment": "Production",
        "provider": "Cognito  (AWS)",
        "size": "2xlarge",
        "own": 1,
        "system": ["#name::ChatBot - Order"],
        "datacenters": "#name::AWS - US East/West"
    },
    {
        "name": "CloudLogs - ChatBot",
        "status": "Active",
        "family": "Logs",
        "environment": "Production",
        "provider": "CloudWatch  (AWS)",
        "size": "16xlarge",
        "own": 1,
        "system": ["#name::ChatBot - Order"],
        "datacenters": "#name::AWS - US East/West"
    },
    {
        "name": "Client - Admin - ChatBot",
        "family": "Application",
        "environment": "Production",
        "language": "JavaScript (Single Page Application)",
        "cluster": "12 Factor",
        "description": "SPA application - Stack stack: ReactJS, Redux",
        "role": {
            "role": "Application",
            "ports": 80,
            "endpoint": "http://chatbot.pizza.io",
            "path": "/home/client-admin-bot/www/statics"
        },
        "tags": [
            {
                    "key": "cost-id",
                "value": "567uhjg"
            },
            {
                "key": "environment",
                "value": "production"
            }
        ],
        "deploy": [
            {
                "type": "Continuos Integration (CI)",
                "provider": "Jenkins"
            },
            {
                "type": "Continuos Deployment (CD)",
                "provider": "Jenkins"
            }
        ],
        "own": 0,
        "system": ["#name::ChatBot - Order"]
    },

    {
        "name": "Backend - ChatBot",
        "family": "Application",
        "environment": "Production",
        "language": "Go",
        "cluster": "12 Factor",
        "role": {
            "role": "Application",
            "endpoint": "http://backend.chatbot.bot",
            "path": "/home/backend/",
            "code": "./run"
        },
        "tags": [
            {
                "key": "cost-id",
                "value": "567uhjg"
            },
            {
                "key": "environment",
                "value": "production"
            }
        ],
        "deploy": [
            {
                "type": "Continuos Integration (CI)",
                "provider": "Jenkins"
            },
            {
                "type": "Continuos Deployment (CD)",
                "provider": "Jenkins"
            }
        ],
        "own": 0,
        "system": ["#name::ChatBot - Order"]
    }
];

const data = _.map(merge, (v) => _.assign({}, template, v));

module.exports = _.reverse(data);
