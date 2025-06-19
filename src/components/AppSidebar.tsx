
import { NavLink, useLocation } from "react-router-dom"
import { 
  BookOpen, 
  Calendar, 
  MessageSquare, 
  BarChart3, 
  Users, 
  HelpCircle,
  GraduationCap,
  Calculator,
  TrendingUp,
  Percent,
  Target,
  Home
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar"

const navigationItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Courses", url: "/courses", icon: BookOpen },
  { title: "Preparation", url: "/preparation", icon: GraduationCap },
  { title: "Schedule", url: "/schedule", icon: Calendar },
  { title: "Forums", url: "/forums", icon: MessageSquare },
  { title: "Assistance", url: "/assistance", icon: HelpCircle },
  { title: "Tutors", url: "/tutors", icon: Users },
]

const toolsItems = [
  { title: "Grade Calculator", url: "/tools/grade-calculator", icon: Calculator },
  { title: "Grade Prediction", url: "/tools/grade-prediction", icon: TrendingUp },
  { title: "Percentage Calculator", url: "/tools/percentage-calculator", icon: Percent },
  { title: "Grade Tracker", url: "/tools/grade-tracker", icon: Target },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname

  const isActive = (path: string) => currentPath === path
  const getNavClassName = (path: string) =>
    isActive(path) 
      ? "bg-blue-100 text-blue-600 font-medium hover:bg-blue-100" 
      : "hover:bg-gray-100"

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="p-4">
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Smart Study
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavClassName(item.url)}
                    >
                      <item.icon className="h-4 w-4" />
                      {state === "expanded" && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {toolsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavClassName(item.url)}
                    >
                      <item.icon className="h-4 w-4" />
                      {state === "expanded" && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
