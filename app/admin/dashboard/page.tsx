"use client"

import { use, useEffect, useState } from "react"
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
import { useMutation, useQuery, QueryClient } from "@tanstack/react-query"
import { toast } from 'react-toastify';




const queryClient = new QueryClient()


interface Project {
  id: string
  title: string
  category: string
  description: string
  image: string
  status: "active" | "completed" | "draft"
  createdAt: string
  images: string[]
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [id, setId] = useState<string | null>(null)
  const [newProject, setNewProject] = useState({
    title: "",
    ar_title: "",
    category: "",
    ar_category: "",
    description: "",
    ar_description: "",
    images: [] as string[],
    status: "",
    ar_status: "",
  })
  const router = useRouter()

  // Check authentication on mount

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await fetch('/api/products/get-all-products')
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    },
   staleTime: 30 * 1000, // 30 seconds
    retry: 2,
    retryDelay: 1000,
  })
 
  interface Category {
    id: string
    name: string
    ar_name?: string
  }
  
  const { data: categories = [], isLoading: isLoadingCategories } = useQuery<Category[]>({
     queryKey: ['categories'],
     queryFn: async () => {
      const response = await fetch('/api/categories')
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
     },
     refetchOnWindowFocus: false,
    })

  interface Status {
    id: string
    name: string
    ar_name?: string
  }
  
  const { data: status = [], isLoading: isLoadingStatus } = useQuery<Status[]>({
     queryKey: ['status'],
     queryFn: async () => {
      const response = await fetch('/api/status')
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
     },
     refetchOnWindowFocus: false,
    })
  
  // calculate product count and other stats
  const totalprojects = projects && projects?.length || 0
  const lastMonthprojects = projects?.filter((product: any) => new Date(product.createdAt) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length || 0

  const { mutate: createProject, isLoading: isCreatingProject } = useMutation(
    async (product: { title: string; category: string; ar_title: string; description: string; ar_description: string; ar_category: string; ar_status: string; images: string[]; status: string }) => {
      const { title, category, ar_title, ar_description, ar_category, ar_status, description, images, status } = product;
      const formData = new FormData();
      formData.append('title', title);
      formData.append('category', category);
      formData.append('ar_title', ar_title);
      formData.append('ar_description', ar_description);
      formData.append('ar_category', ar_category);
      formData.append('ar_status', ar_status);
      formData.append('status', status);
      formData.append('description', description);
      images.forEach((image: any, index: number) => {
        formData.append(`images[${index}]`, image);
      });

      const response = await fetch('/api/products/create-product', {
        method: 'POST',
        body: formData, credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Login failed');
      }
      return response.json();
    },
    {
      onSuccess: () => {
        console.log('onSuccess: Project created');
        queryClient.invalidateQueries({ queryKey: ['projects'] });
        console.log('queryClient.invalidateQueries called');
        toast.success("Project has been successfully created.");
        console.log('toast called');
        setNewProject({
          title: "",
          ar_title: "",
          category: "",
          ar_category: "",
          description: "",
          ar_description: "",
          status: "",
          ar_status: "",
          images: [],
        });
        setIsAddDialogOpen(false);
      },
      onError: (error) => {
        console.error('Error creating product:', error);
        toast.error('Failed to create project');
      },
    }
  );

  // Define mutateUpdate at the top level, using the latest id via closure
  const { mutate: updateProject } = useMutation(
    async ({ product, id }: { product: { title: string; category: string; ar_title: string; description: string; ar_description: string; ar_category: string; ar_status: string; images: string[]; status: string }, id: string }) => {
      const { title, category, ar_title, ar_description, ar_category, ar_status, description, images, status } = product;
      const formData = new FormData();
      formData.append('title', title);
      formData.append('category', category);
      formData.append('ar_title', ar_title);
      formData.append('ar_description', ar_description);
      formData.append('ar_category', ar_category);
      formData.append('ar_status', ar_status);
      formData.append('status', status);
      formData.append('description', description);
      images.forEach((image: any, index: number) => {
        formData.append(`images[${index}]`, image);
      });

      const response = await fetch(`/api/products/update-product/${id}`, {
        method: 'PUT',
        body: formData,
        credentials: 'include',
      });
      let data;
      try {
        data = await response.json();
      } catch {
        data = { error: 'No JSON response from server' };
      }
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update project');
      }
      return data;
    },
    {
      onSuccess: () => {
        console.log('onSuccess: Project updated');
        queryClient.invalidateQueries({ queryKey: ['projects'] });
        console.log('queryClient.invalidateQueries called');
        toast.success("Project has been successfully updated.");
        console.log('toast called');
        setNewProject({
          title: "",
          ar_title: "",
          category: "",
          ar_category: "",
          description: "",
          ar_description: "",
          status: "",
          ar_status: "",
          images: [],
        });
        setIsAddDialogOpen(false);
      },
      onError: (error: any) => {
        console.error('Error updating product:', error?.message || error);
        toast.error(error?.message || 'Failed to update project');
      },
    }
  );

  const { mutate: deleteProject } = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/products/delete-product/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete project');
      }
      return response.json();
    },
    onSuccess: () => {
      console.log('onSuccess: Project deleted');
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      console.log('queryClient.invalidateQueries called');
      toast.success("Project has been successfully deleted.");
      console.log('toast called');
    },
    onError: (error) => {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
    },
  });

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth")
    if (auth !== "true") {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
      // Load sample projects
      // setProjects([
      //   {
      //     id: "1",
      //     title: "Saudi Central Bank",
      //     category: "commercial",
      //     description: "Central Bank building development and renovation project",
      //     image: "/placeholder.svg?height=200&width=300",
      //     status: "completed",
      //     createdAt: "2024-01-15",
      //   },
      //   {
      //     id: "2",
      //     title: "Prince Mohammed Palace",
      //     category: "residential",
      //     description: "Luxury palace with distinctive architectural design",
      //     image: "/placeholder.svg?height=200&width=300",
      //     status: "active",
      //     createdAt: "2024-02-20",
      //   },
      // ])
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    router.push("/admin/login")
  }
  const handleAddProject = () => {
   
   if (id) {
   updateProject({ product: newProject, id })
   } else {
    createProject(newProject)
   }
    // setIsAddDialogOpen(false)
    setId(null)
  }
    
  

  const handleDeleteProject = (id: string) => {
    deleteProject(id);
  }

  const handleEditProject = (id: string) => {
    setId(id);
    setIsAddDialogOpen(true);
  };

  // Fetch product data for editing when id changes and dialog is open
  useEffect(() => {
    const fetchProduct = async () => {
      if (id && isAddDialogOpen) {
        try {
          const response = await fetch(`/api/products/get-product/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const product = await response.json();
            setNewProject(prev => ({
            ...prev,
            title: product?.title || "",
            ar_title: product?.ar_title || "",
            category: product?.category || "",
            ar_category: product?.ar_category || "",
            description: product?.description || "",
            ar_description: product?.ar_description || "",
            images: product?.images || prev.images,
            status: product?.status || "draft",
            ar_status: product?.ar_status || "draft",
            }));
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isAddDialogOpen]);

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
              <div className="text-2xl font-bold text-gray-900 dark:text-foreground">{totalprojects}</div>
              <p className="text-xs text-gray-500 dark:text-muted-foreground">{lastMonthprojects} from last month</p>
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
                {projects.filter((p: Project) => p.status === "draft").length}
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
                  <Button className="bg-gradient-to-r from-purple-600  to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Project
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[950px] my-11  bg-white dark:bg-background border-gray-200 dark:border-border">
                  <DialogHeader>
                    <DialogTitle className="text-gray-900 dark:text-foreground">Add New Project</DialogTitle>
                    <DialogDescription className="text-gray-600 dark:text-muted-foreground">
                      Create a new project entry for your portfolio
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 grid-cols-2 py-4 ">
                    <div className="grid gap-2 ">
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
                    <div className="grid gap-2 ">
                      <Label htmlFor="ar_title" className="text-gray-700 dark:text-gray-300">
                        Project Title (Arabic)
                      </Label>
                      <Input
                        id="ar_title"
                        value={newProject.ar_title}
                        onChange={(e) => setNewProject({ ...newProject, ar_title: e.target.value })}
                        placeholder="أدخل عنوان المشروع"
                        className="border-gray-300 dark:border-border focus:border-purple-500 dark:focus:border-purple-400"
                      />
                    </div>
                    <div className="grid gap-2 ">
                      <Label htmlFor="category" className="text-gray-700 dark:text-gray-300">
                        Category
                      </Label>
                      <Select
                        value={newProject.category}
                        onValueChange={(value) => setNewProject({ ...newProject, category: value, ar_category: value })}
                      >
                        <SelectTrigger className="border-gray-300 dark:border-border focus:border-purple-500 dark:focus:border-purple-400">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-background border-gray-200 dark:border-border">
                          {categories.map((cat: any) => (
                            <SelectItem key={cat.id} value={cat.id}  className="text-gray-700 dark:text-gray-300">
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2  ">
                      <Label htmlFor="ar_category" className="text-gray-700 dark:text-gray-300">
                        Category (Arabic)
                      </Label>
                      <Select
                        value={newProject.ar_category}
                        onValueChange={(value) => setNewProject({ ...newProject, ar_category: value, category: value })}
                      >
                        <SelectTrigger className="border-gray-300 dark:border-border focus:border-purple-500 dark:focus:border-purple-400">
                          <SelectValue placeholder="اختر تصنيف المشروع" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-background border-gray-200 dark:border-border">
                          {categories.map((cat: any) => (
                            <SelectItem key={cat.id} value={cat.id} className="text-gray-700 dark:text-gray-300">
                              {cat.ar_name || cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2 ">
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
                    <div className="grid gap-2 ">
                      <Label htmlFor="ar_description" className="text-gray-700 dark:text-gray-300">
                        Description (Arabic)
                      </Label>
                      <Textarea
                        id="ar_description"
                        value={newProject.ar_description}
                        onChange={(e) => setNewProject({ ...newProject, ar_description: e.target.value })}
                        placeholder="أدخل وصف المشروع"
                        className="border-gray-300 dark:border-border focus:border-purple-500 dark:focus:border-purple-400"
                      />
                    </div>
                  
                    <div className="grid gap-2 ">
                      <Label htmlFor="status" className="text-gray-700 dark:text-gray-300">
                        Status
                      </Label>
                      <Select
                        value={newProject.status}
                        onValueChange={(value: any) => setNewProject({ ...newProject, status: value, ar_status: value })}
                      >
                        <SelectTrigger className="border-gray-300 dark:border-border focus:border-purple-500 dark:focus:border-purple-400">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-background border-gray-200 dark:border-border">
                          {status.map((stat: any) => (
                            <SelectItem key={stat.id} value={stat.id} className="text-gray-700 dark:text-gray-300">
                              {stat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2 ">
                      <Label htmlFor="ar_status" className="text-gray-700 dark:text-gray-300">
                        Status (Arabic)
                      </Label>
                      <Select
                        value={newProject.ar_status}
                        onValueChange={(value) => setNewProject({ ...newProject, ar_status: value , status: value })}
                      >
                        <SelectTrigger className="border-gray-300 dark:border-border focus:border-purple-500 dark:focus:border-purple-400">
                          <SelectValue placeholder="اختر حالة المشروع" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-background border-gray-200 dark:border-border">
                          {status.map((stat: any) => (
                            <SelectItem key={stat.id} value={stat.id} className="text-gray-700 dark:text-gray-300">
                              {stat.ar_name || stat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                      <div className="grid gap-2 grid-cols-1 ">
                      <Label htmlFor="images" className="text-gray-700 dark:text-gray-300">
                      Project Images
                      </Label>
                      <Input
                      id="images"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        setNewProject({
                        ...newProject,
                        images: files as any, // You may want to handle File[] properly in your backend
                        });
                      }}
                      className="border-gray-300 dark:border-border focus:border-purple-500 dark:focus:border-purple-400"
                      />
                      <div className="flex flex-wrap gap-2 mt-2">
                      {Array.from(newProject.images || []).map((file: any, idx: number) => (
                        <div key={idx} className="w-12 h-12 rounded overflow-hidden border border-gray-200 dark:border-border">
                        <img
                          src={typeof file === "string" ? file : URL.createObjectURL(file)}
                          alt={`preview-${idx}`}
                          className="object-cover w-full h-full"
                        />
                        </div>
                      ))}
                      </div>
                    </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => {setIsAddDialogOpen(false)
                        setNewProject(
                          {
                            title: "",
                            ar_title: "",
                            category: "",
                            ar_category: "",
                            description: "",
                            ar_description: "",
                            status: "",
                            ar_status: "",
                            images: [],
                          }
                        )
                      }}  
                      className="border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-border dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleAddProject}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    >
                     {id ? "Update Project" : "Add Project"}
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
                          src={project.images[0] || "/placeholder.svg"}
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
                       {
                        categories.find((cat: any) => cat.id === project.category)?.name || "Unknown"
                       }
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(status.find((stat: any) => stat.id === project.status)?.name || "active")} text-white  capitalize`}>
                      {
                        status.find((stat: any) => stat.id === project.status)?.name || "Unknown"
                      }
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-300">
                      {
                        new Date(project.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      }
                    </TableCell>
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
                          <DropdownMenuItem 
                          onClick={() => {
                            handleEditProject(project.id)
                          }}
                           className="text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
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
