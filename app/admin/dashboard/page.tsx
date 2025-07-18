"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LogOut, Plus, MoreHorizontal, Edit, Trash2, Eye, ImageIcon, Building2, Users, FolderOpen } from "lucide-react"

interface Project {
  id: string
  title: string
  category: string
  description: string
  image: string
  status: "active" | "completed" | "draft"
  createdAt: string
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newProject, setNewProject] = useState({
    title: "",
    category: "",
    description: "",
    image: "",
    status: "draft" as const,
  })
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth")
    if (auth !== "true") {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
      // Load sample projects
      setProjects([
        {
          id: "1",
          title: "Saudi Central Bank",
          category: "commercial",
          description: "Central Bank building development and renovation project",
          image: "/placeholder.svg?height=200&width=300",
          status: "completed",
          createdAt: "2024-01-15",
        },
        {
          id: "2",
          title: "Prince Mohammed Palace",
          category: "residential",
          description: "Luxury palace with distinctive architectural design",
          image: "/placeholder.svg?height=200&width=300",
          status: "active",
          createdAt: "2024-02-20",
        },
      ])
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    router.push("/admin/login")
  }

  const handleAddProject = () => {
    const project: Project = {
      id: Date.now().toString(),
      ...newProject,
      createdAt: new Date().toISOString().split("T")[0],
    }
    setProjects([...projects, project])
    setNewProject({
      title: "",
      category: "",
      description: "",
      image: "",
      status: "draft",
    })
    setIsAddDialogOpen(false)
  }

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "completed":
        return "bg-blue-500"
      case "draft":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-muted/30">
      {/* Header */}
      <header className="bg-white dark:bg-background border-b border-gray-200 dark:border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-foreground">Admin Dashboard</h1>
              <Badge
                variant="outline"
                className="border-purple-300 text-purple-700 bg-purple-50 dark:border-purple-500/30 dark:text-purple-300 dark:bg-purple-500/10"
              >
                Court Contracting Company
              </Badge>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-border dark:text-gray-300 dark:hover:bg-gray-800 bg-transparent"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white dark:bg-background border-gray-200 dark:border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Projects</CardTitle>
              <Building2 className="h-4 w-4 text-gray-500 dark:text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-foreground">{projects.length}</div>
              <p className="text-xs text-gray-500 dark:text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-background border-gray-200 dark:border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Active Projects</CardTitle>
              <FolderOpen className="h-4 w-4 text-gray-500 dark:text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-foreground">
                {projects.filter((p) => p.status === "active").length}
              </div>
              <p className="text-xs text-gray-500 dark:text-muted-foreground">Currently in progress</p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-background border-gray-200 dark:border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Completed</CardTitle>
              <Users className="h-4 w-4 text-gray-500 dark:text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-foreground">
                {projects.filter((p) => p.status === "completed").length}
              </div>
              <p className="text-xs text-gray-500 dark:text-muted-foreground">Successfully finished</p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-background border-gray-200 dark:border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Draft Projects</CardTitle>
              <ImageIcon className="h-4 w-4 text-gray-500 dark:text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-foreground">
                {projects.filter((p) => p.status === "draft").length}
              </div>
              <p className="text-xs text-gray-500 dark:text-muted-foreground">Pending approval</p>
            </CardContent>
          </Card>
        </div>

        {/* Projects Table */}
        <Card className="bg-white dark:bg-background border-gray-200 dark:border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-gray-900 dark:text-foreground">Projects Management</CardTitle>
                <CardDescription className="text-gray-600 dark:text-muted-foreground">
                  Manage your construction projects and portfolio
                </CardDescription>
              </div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Project
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-white dark:bg-background border-gray-200 dark:border-border">
                  <DialogHeader>
                    <DialogTitle className="text-gray-900 dark:text-foreground">Add New Project</DialogTitle>
                    <DialogDescription className="text-gray-600 dark:text-muted-foreground">
                      Create a new project entry for your portfolio
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title" className="text-gray-700 dark:text-gray-300">
                        Project Title
                      </Label>
                      <Input
                        id="title"
                        value={newProject.title}
                        onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                        placeholder="Enter project title"
                        className="border-gray-300 dark:border-border focus:border-purple-500 dark:focus:border-purple-400"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="category" className="text-gray-700 dark:text-gray-300">
                        Category
                      </Label>
                      <Select
                        value={newProject.category}
                        onValueChange={(value) => setNewProject({ ...newProject, category: value })}
                      >
                        <SelectTrigger className="border-gray-300 dark:border-border focus:border-purple-500 dark:focus:border-purple-400">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-background border-gray-200 dark:border-border">
                          <SelectItem value="residential" className="text-gray-700 dark:text-gray-300">
                            Residential
                          </SelectItem>
                          <SelectItem value="commercial" className="text-gray-700 dark:text-gray-300">
                            Commercial
                          </SelectItem>
                          <SelectItem value="renovation" className="text-gray-700 dark:text-gray-300">
                            Renovation
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description" className="text-gray-700 dark:text-gray-300">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        value={newProject.description}
                        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                        placeholder="Enter project description"
                        className="border-gray-300 dark:border-border focus:border-purple-500 dark:focus:border-purple-400"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="image" className="text-gray-700 dark:text-gray-300">
                        Image URL
                      </Label>
                      <Input
                        id="image"
                        value={newProject.image}
                        onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                        placeholder="Enter image URL or upload"
                        className="border-gray-300 dark:border-border focus:border-purple-500 dark:focus:border-purple-400"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="status" className="text-gray-700 dark:text-gray-300">
                        Status
                      </Label>
                      <Select
                        value={newProject.status}
                        onValueChange={(value: any) => setNewProject({ ...newProject, status: value })}
                      >
                        <SelectTrigger className="border-gray-300 dark:border-border focus:border-purple-500 dark:focus:border-purple-400">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-background border-gray-200 dark:border-border">
                          <SelectItem value="draft" className="text-gray-700 dark:text-gray-300">
                            Draft
                          </SelectItem>
                          <SelectItem value="active" className="text-gray-700 dark:text-gray-300">
                            Active
                          </SelectItem>
                          <SelectItem value="completed" className="text-gray-700 dark:text-gray-300">
                            Completed
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsAddDialogOpen(false)}
                      className="border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-border dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleAddProject}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    >
                      Add Project
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-gray-200 dark:border-border">
                  <TableHead className="text-gray-700 dark:text-gray-300">Project</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">Category</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">Created</TableHead>
                  <TableHead className="text-right text-gray-700 dark:text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow
                    key={project.id}
                    className="border-gray-200 dark:border-border hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-10 h-10 rounded-lg object-cover border border-gray-200 dark:border-border"
                        />
                        <div>
                          <div className="font-medium text-gray-900 dark:text-foreground">{project.title}</div>
                          <div className="text-sm text-gray-500 dark:text-muted-foreground">
                            {project.description.substring(0, 50)}...
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="capitalize border-gray-300 text-gray-700 bg-gray-50 dark:border-border dark:text-gray-300 dark:bg-gray-800"
                      >
                        {project.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(project.status)} text-white capitalize`}>
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-300">{project.createdAt}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="bg-white dark:bg-background border-gray-200 dark:border-border"
                        >
                          <DropdownMenuItem className="text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                            onClick={() => handleDeleteProject(project.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
