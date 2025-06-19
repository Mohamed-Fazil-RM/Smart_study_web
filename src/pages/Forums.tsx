
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageSquare, Plus, Users, DollarSign, HelpCircle } from 'lucide-react';

const Forums = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Need help with Data Structures assignment',
      content: 'Can someone help me with implementing a binary search tree?',
      author: 'John Doe',
      type: 'help',
      payment: null,
      replies: 3,
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      title: 'Web Development Project - Paid Work',
      content: 'Looking for someone to help with React development. Willing to pay ₹500/hour',
      author: 'Sarah Smith',
      type: 'paid',
      payment: '₹500/hour',
      replies: 7,
      timestamp: '4 hours ago'
    }
  ]);

  const [communities] = useState([
    { id: 1, name: 'IIT Madras - Computer Science', members: 1250, joined: true },
    { id: 2, name: 'Web Development Hub', members: 850, joined: false },
    { id: 3, name: 'Data Science Learning', members: 620, joined: false }
  ]);

  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    type: 'help',
    payment: ''
  });

  const addPost = () => {
    if (newPost.title && newPost.content) {
      setPosts([{
        id: Date.now(),
        ...newPost,
        author: 'You',
        replies: 0,
        timestamp: 'Just now',
        payment: newPost.type === 'paid' ? newPost.payment : null
      }, ...posts]);
      setNewPost({ title: '', content: '', type: 'help', payment: '' });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Forums</h1>
          <p className="text-gray-600">Connect with students and get help</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Post</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Input
                  placeholder="Post title..."
                  value={newPost.title}
                  onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                />
              </div>
              <div>
                <Textarea
                  placeholder="Describe your question or offer..."
                  value={newPost.content}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                />
              </div>
              <div className="flex space-x-4">
                <Button
                  variant={newPost.type === 'help' ? 'default' : 'outline'}
                  onClick={() => setNewPost({...newPost, type: 'help'})}
                >
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Need Help
                </Button>
                <Button
                  variant={newPost.type === 'paid' ? 'default' : 'outline'}
                  onClick={() => setNewPost({...newPost, type: 'paid'})}
                >
                  <DollarSign className="h-4 w-4 mr-2" />
                  Paid Work
                </Button>
              </div>
              {newPost.type === 'paid' && (
                <Input
                  placeholder="Payment amount (e.g., ₹500/hour)"
                  value={newPost.payment}
                  onChange={(e) => setNewPost({...newPost, payment: e.target.value})}
                />
              )}
              <Button onClick={addPost} className="w-full">Post</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="public" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="public">Public Forum</TabsTrigger>
          <TabsTrigger value="communities">Communities</TabsTrigger>
        </TabsList>

        <TabsContent value="public" className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-lg">{post.title}</h3>
                      {post.payment && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          {post.payment}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-3">{post.content}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>By {post.author}</span>
                      <span>{post.timestamp}</span>
                      <span className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {post.replies} replies
                      </span>
                    </div>
                  </div>
                  <Avatar>
                    <AvatarFallback>{post.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="communities" className="space-y-4">
          {communities.map((community) => (
            <Card key={community.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-lg">{community.name}</h3>
                    <p className="text-gray-600 flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {community.members} members
                    </p>
                  </div>
                  <Button 
                    variant={community.joined ? 'outline' : 'default'}
                    className={community.joined ? 'text-gray-600' : ''}
                  >
                    {community.joined ? 'Joined' : 'Join'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Forums;
