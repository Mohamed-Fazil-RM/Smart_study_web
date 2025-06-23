
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { NewPostDialog } from '@/components/forums/NewPostDialog';
import { MessageSquare, Users, Plus, Search, Image, DollarSign, Bell, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Post {
  id: number;
  title: string;
  description?: string;
  author: string;
  time: string;
  replies: number;
  type: string;
  college: string;
  payment?: string;
  image?: string;
}

const Forums = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const [publicPosts, setPublicPosts] = useState<Post[]>([
    {
      id: 1,
      title: 'Need help with Data Structures assignment',
      description: 'Looking for guidance on implementing binary search trees',
      author: 'John Doe',
      time: '2 hours ago',
      replies: 5,
      type: 'help',
      college: 'IIT Madras'
    },
    {
      id: 2,
      title: 'Looking for project partner - Web Development',
      description: 'Building a full-stack e-commerce application using React and Node.js',
      author: 'Jane Smith',
      time: '4 hours ago',
      replies: 12,
      type: 'collaboration',
      college: 'The New College',
      payment: '₹2000'
    }
  ]);

  const communities = [
    { id: 1, name: 'IIT Madras - Computer Science', members: 1240, active: true },
    { id: 2, name: 'Web Development Hub', members: 856, active: false },
    { id: 3, name: 'Data Science Study Group', members: 642, active: false }
  ];

  const handleNewPost = async (newPost: any) => {
    // Send to backend (placeholder for backend integration)
    try {
      // TODO: Replace with actual backend call
      console.log('Sending post to backend:', newPost);
      
      setPublicPosts([newPost, ...publicPosts]);
    } catch (error) {
      console.error('Failed to save post to backend:', error);
    }
  };

  const filteredPosts = publicPosts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          {/* Header */}
          <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-10">
            <div className="flex justify-between items-center h-16 px-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate('/dashboard')}
                  className="h-7 w-7"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <SidebarTrigger className="h-7 w-7" />
                <h1 className="text-xl font-semibold text-gray-900">Forums</h1>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon">
                  <Bell className="h-4 w-4" />
                </Button>
                <NewPostDialog onPostCreated={handleNewPost} />
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="p-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-[calc(100vh-4rem)]">
            <Tabs defaultValue="public" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="public">Public Forum</TabsTrigger>
                <TabsTrigger value="communities">Communities</TabsTrigger>
              </TabsList>

              <TabsContent value="public" className="space-y-6">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/80 backdrop-blur-lg"
                  />
                </div>

                {/* Posts */}
                <div className="space-y-4">
                  {filteredPosts.map((post) => (
                    <Card key={post.id} className="bg-white/80 backdrop-blur-lg border-white/30 hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg mb-2">{post.title}</CardTitle>
                            
                            {/* Image Display */}
                            {post.image && (
                              <div className="mb-3">
                                <img 
                                  src={post.image} 
                                  alt="Post attachment" 
                                  className="w-full max-h-64 object-cover rounded-lg border"
                                />
                              </div>
                            )}
                            
                            {post.description && (
                              <p className="text-gray-600 mb-3 text-sm">{post.description}</p>
                            )}
                            
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span>by {post.author}</span>
                              <span>{post.time}</span>
                              <span>{post.college}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {post.payment && (
                              <div className="flex items-center text-green-600 bg-green-50 px-2 py-1 rounded">
                                <DollarSign className="h-3 w-3 mr-1" />
                                <span className="text-xs font-medium">{post.payment}</span>
                              </div>
                            )}
                            <div className="flex items-center text-blue-600">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              <span className="text-sm">{post.replies}</span>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center">
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">Reply</Button>
                            <Button size="sm" variant="outline">
                              <Image className="h-3 w-3 mr-1" />
                              Attach
                            </Button>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded ${
                            post.type === 'help' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
                          }`}>
                            {post.type}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="communities" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {communities.map((community) => (
                    <Card key={community.id} className="bg-white/80 backdrop-blur-lg border-white/30">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Users className="h-5 w-5 mr-2 text-blue-600" />
                            {community.name}
                          </div>
                          {community.active && (
                            <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">Active</span>
                          )}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-4">{community.members} members</p>
                        <Button 
                          className={`w-full ${community.active ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                        >
                          {community.active ? 'Active' : 'Join Community'}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Create Community */}
                <Card className="bg-white/80 backdrop-blur-lg border-white/30 border-2 border-dashed">
                  <CardContent className="flex flex-col items-center justify-center p-8">
                    <Plus className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Create New Community</h3>
                    <p className="text-gray-600 text-center mb-4">
                      Start a community for skill-based learning or study groups
                    </p>
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Community
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Forums;
