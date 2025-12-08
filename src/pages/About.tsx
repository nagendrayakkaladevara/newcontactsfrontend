import { 
  Search, 
  Users, 
  FileText, 
  BarChart3, 
  HeartPulse, 
  Briefcase, 
  Building2,
  Zap,
  Globe,
  CheckCircle2,
  Sparkles,
  Star,
  ArrowRight,
  Code,
  Rocket
} from "lucide-react"

const features = [
  {
    icon: <Search className="h-7 w-7" />,
    title: "Advanced Search",
    description: "Search contacts by name or phone number with instant results and smart filtering capabilities.",
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950"
  },
  {
    icon: <Users className="h-7 w-7" />,
    title: "Contact Management",
    description: "Comprehensive contact directory with detailed information including phone numbers, designations, and divisions.",
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950"
  },
  {
    icon: <HeartPulse className="h-7 w-7" />,
    title: "Blood Group Filtering",
    description: "Quickly find contacts by blood group for emergency situations and medical requirements.",
    gradient: "from-red-500 to-rose-500",
    bgGradient: "from-red-50 to-rose-50 dark:from-red-950 dark:to-rose-950"
  },
  {
    icon: <Briefcase className="h-7 w-7" />,
    title: "Designation & Division",
    description: "Filter contacts by designation and division to find the right person for your needs.",
    gradient: "from-green-500 to-emerald-500",
    bgGradient: "from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950"
  },
  {
    icon: <FileText className="h-7 w-7" />,
    title: "Document Management",
    description: "Access important documents with easy search and download functionality.",
    gradient: "from-orange-500 to-amber-500",
    bgGradient: "from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950"
  },
  {
    icon: <BarChart3 className="h-7 w-7" />,
    title: "Analytics Dashboard",
    description: "Comprehensive analytics including visit counts, distributions, growth trends, and recent activity.",
    gradient: "from-indigo-500 to-violet-500",
    bgGradient: "from-indigo-50 to-violet-50 dark:from-indigo-950 dark:to-violet-950"
  },
  {
    icon: <Building2 className="h-7 w-7" />,
    title: "Lobby Distribution",
    description: "View contact distribution across different lobbies and organizational units.",
    gradient: "from-teal-500 to-cyan-500",
    bgGradient: "from-teal-50 to-cyan-50 dark:from-teal-950 dark:to-cyan-950"
  },
  {
    icon: <Zap className="h-7 w-7" />,
    title: "Fast & Responsive",
    description: "Lightning-fast performance with optimized search and seamless user experience.",
    gradient: "from-yellow-500 to-orange-500",
    bgGradient: "from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950"
  }
]

const highlights = [
  { text: "Real-time contact search", icon: <Zap className="h-4 w-4" /> },
  { text: "Mobile-responsive design", icon: <Globe className="h-4 w-4" /> },
  { text: "Secure and reliable", icon: <CheckCircle2 className="h-4 w-4" /> },
  { text: "Easy navigation", icon: <ArrowRight className="h-4 w-4" /> },
  { text: "Comprehensive analytics", icon: <BarChart3 className="h-4 w-4" /> },
  { text: "Emergency contact access", icon: <HeartPulse className="h-4 w-4" /> }
]

const techStack = [
  { name: "React", color: "bg-blue-500/10 text-blue-600 border-blue-200 dark:text-blue-400 dark:border-blue-800" },
  { name: "TypeScript", color: "bg-indigo-500/10 text-indigo-600 border-indigo-200 dark:text-indigo-400 dark:border-indigo-800" },
  { name: "Express", color: "bg-green-500/10 text-green-600 border-green-200 dark:text-green-400 dark:border-green-800" },
  { name: "PostgreSQL", color: "bg-sky-500/10 text-sky-600 border-sky-200 dark:text-sky-400 dark:border-sky-800" },
  { name: "Tailwind CSS", color: "bg-cyan-500/10 text-cyan-600 border-cyan-200 dark:text-cyan-400 dark:border-cyan-800" },
  { name: "Modern UI", color: "bg-purple-500/10 text-purple-600 border-purple-200 dark:text-purple-400 dark:border-purple-800" },
  { name: "Responsive Design", color: "bg-pink-500/10 text-pink-600 border-pink-200 dark:text-pink-400 dark:border-pink-800" },
  { name: "Fast Performance", color: "bg-orange-500/10 text-orange-600 border-orange-200 dark:text-orange-400 dark:border-orange-800" }
]

export function About() {
  return (
    <div className="flex flex-col gap-12 max-w-7xl mx-auto px-4 pb-12">
      {/* Hero Section - Enhanced */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 via-purple-600 to-pink-600 p-8 md:p-16 text-white shadow-2xl">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-md border border-white/30 shadow-lg">
              <Sparkles className="h-6 w-6 animate-pulse" />
            </div>
            <span className="px-4 py-2 bg-white/20 text-white border border-white/30 rounded-full text-sm font-semibold backdrop-blur-md shadow-lg">
              About Application
            </span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 text-yellow-300 fill-yellow-300" />
              ))}
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              East Coast Railway
            </span>
            <br />
            <span className="text-white drop-shadow-lg">
              Contacts Management
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
              System
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed mb-8">
            A comprehensive, modern solution for managing contacts, documents, and analytics 
            for the <span className="font-semibold text-white">East Coast Railway, Waltair Division</span>. 
            Built with cutting-edge technology to provide seamless user experience.
          </p>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full backdrop-blur-md border border-white/30">
              <Rocket className="h-5 w-5" />
              <span className="font-medium">Modern Technology</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full backdrop-blur-md border border-white/30">
              <Code className="h-5 w-5" />
              <span className="font-medium">Open Source</span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Highlights - Redesigned */}
      <div>
        <div className="mb-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            Why Choose Us?
          </h2>
          <p className="text-muted-foreground text-lg">
            Experience the power of modern contact management
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="group relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl" />
              <div className="relative flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {highlight.icon}
                </div>
                <span className="text-base font-semibold text-gray-900 dark:text-white">{highlight.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Grid - Enhanced */}
      <div>
        <div className="mb-8 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Key Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the powerful features that make this application essential for contact management
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden p-8 rounded-3xl border-2 border-gray-200 dark:border-gray-700 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 hover:shadow-2xl hover:border-transparent transition-all duration-500 hover:-translate-y-2"
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl group-hover:blur-2xl transition-all duration-500" />
              
              <div className="relative z-10">
                {/* Icon with gradient background */}
                <div className={`mb-6 p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 w-fit`}>
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Stack - Enhanced */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-gray-200 dark:border-gray-700 bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 p-8 md:p-12 shadow-xl">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg mb-4">
              <Globe className="h-8 w-8" />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Built with Modern Technology
            </h2>
            <p className="text-lg text-muted-foreground">
              Leveraging the latest web technologies for optimal performance and user experience
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech, index) => (
              <span
                key={index}
                className={`px-6 py-3 text-sm font-semibold rounded-full border-2 ${tech.color} backdrop-blur-sm shadow-md hover:scale-110 hover:shadow-lg transition-all duration-300`}
              >
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Note - Enhanced */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-8 md:p-12 text-white shadow-2xl border-2 border-gray-700">
        {/* Animated background */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        
        <div className="relative z-10 text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-gradient-to-br from-red-500 to-pink-500 mb-4 shadow-lg">
              <HeartPulse className="h-6 w-6 text-white" />
            </div>
            <p className="text-lg md:text-xl mb-2">
              Developed with <span className="text-red-400 animate-pulse">❤️</span> by{" "}
              <span className="font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent text-2xl">
                Nagendra Yakkaladevara
              </span>
            </p>
            <p className="text-sm md:text-base text-gray-300 mt-4">
              For <span className="font-semibold text-white">East Coast Railway, Waltair Division</span>
            </p>
          </div>
          
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
            <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  )
}
