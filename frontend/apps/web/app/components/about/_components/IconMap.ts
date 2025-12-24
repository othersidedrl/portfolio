import {
  Atom,
  BarChart,
  Cloud,
  Code2,
  Cpu,
  CreditCard,
  Database,
  File,
  FileText,
  GitBranch,
  Globe,
  HardDrive,
  Key,
  Layers,
  Layout,
  Lock,
  type LucideIcon,
  MessageSquare,
  Monitor,
  Package,
  Server,
  ShieldCheck,
  Smartphone,
  Terminal,
  Zap,
} from "lucide-react";

export const iconMap: { keywords: string[]; icon: LucideIcon }[] = [
  // Languages & runtimes
  { keywords: ["golang", "go", "gin", "chi", "gofiber", "gorilla", "grpc"], icon: Cpu },
  {
    keywords: ["node", "nodejs", "express", "fastify", "nest", "hapi", "koa", "pm2"],
    icon: Server,
  },
  {
    keywords: [
      "python",
      "py",
      "flask",
      "django",
      "fastapi",
      "pytorch",
      "tensorflow",
      "numpy",
      "scipy",
    ],
    icon: Terminal,
  },
  { keywords: ["ruby", "rails", "sinatra"], icon: Terminal },
  { keywords: ["php", "laravel", "symfony", "cakephp", "codeigniter"], icon: Server },

  // Frontend / JS frameworks
  {
    keywords: ["react", "next", "preact", "vite", "solid", "svelte", "remix", "astro"],
    icon: Atom,
  },
  {
    keywords: ["typescript", "ts", "javascript", "js", "es6", "babel", "webpack", "rollup"],
    icon: Code2,
  },
  {
    keywords: [
      "frontend",
      "ui",
      "ux",
      "css",
      "scss",
      "sass",
      "tailwind",
      "bootstrap",
      "material-ui",
      "chakra",
    ],
    icon: Layout,
  },

  // Mobile
  {
    keywords: ["react-native", "native", "flutter", "dart", "android", "ios", "swift", "kotlin"],
    icon: Smartphone,
  },

  // Databases & storage
  { keywords: ["postgres", "postgresql", "sql", "psql"], icon: Database },
  { keywords: ["mysql", "mariadb", "sqlite", "sqlite3"], icon: Database },
  { keywords: ["mongodb", "mongo", "nosql", "couch"], icon: Database },
  { keywords: ["redis", "memcached", "key-value"], icon: Database },
  { keywords: ["s3", "minio", "object-storage", "blob", "file-storage"], icon: HardDrive },

  // Containers / orchestration / infra
  { keywords: ["docker", "container", "compose", "podman"], icon: Package },
  { keywords: ["kubernetes", "k8s", "helm", "istio", "minikube"], icon: Package },
  { keywords: ["gcp", "google cloud", "aws", "amazon", "azure", "lambda", "cloud"], icon: Cloud },
  { keywords: ["terraform", "ansible", "pulumi", "vagrant", "packer"], icon: Layers },

  // Backend / API / architecture
  {
    keywords: [
      "backend",
      "api",
      "rest",
      "graphql",
      "graphql-api",
      "grpc",
      "microservice",
      "microservices",
    ],
    icon: Globe,
  },
  { keywords: ["server", "serverless", "edge"], icon: Server },

  // DevOps / CI-CD / version control
  {
    keywords: ["ci", "cd", "github-actions", "jenkins", "gitlab-ci", "circleci", "travis"],
    icon: GitBranch,
  },
  { keywords: ["git", "github", "gitlab", "version-control", "commit", "branch"], icon: GitBranch },

  // Messaging & streaming
  {
    keywords: ["kafka", "rabbitmq", "nats", "mqtt", "activemq", "pubsub", "streaming", "message"],
    icon: MessageSquare,
  },

  // Monitoring / observability / logging
  {
    keywords: [
      "prometheus",
      "grafana",
      "loki",
      "sentry",
      "datadog",
      "newrelic",
      "observability",
      "otel",
      "opentelemetry",
    ],
    icon: Monitor,
  },

  // Security / auth
  {
    keywords: [
      "oauth",
      "jwt",
      "openid",
      "sso",
      "auth0",
      "keycloak",
      "passport",
      "authentication",
      "authorization",
    ],
    icon: ShieldCheck,
  },
  { keywords: ["encryption", "tls", "ssl", "cert", "key", "secrets"], icon: Key },
  { keywords: ["acl", "rbac", "permissions"], icon: Lock },

  // Testing / quality
  {
    keywords: ["jest", "mocha", "chai", "pytest", "cypress", "playwright", "testing", "tdd", "bdd"],
    icon: Zap,
  },

  // Data / analytics / ETL
  {
    keywords: ["spark", "hadoop", "airflow", "dag", "dbt", "pandas", "etl", "data", "analytics"],
    icon: BarChart,
  },

  // Payments & commerce
  {
    keywords: ["stripe", "paypal", "payment", "billing", "checkout", "midtrans"],
    icon: CreditCard,
  },

  // Files & docs
  { keywords: ["md", "markdown", "docs", "readme", "doc", "documentation"], icon: FileText },

  // Generic / fallback
  { keywords: ["file", "asset", "artifact", "build"], icon: File },
  { keywords: ["default", "other", "misc"], icon: Package },
];
