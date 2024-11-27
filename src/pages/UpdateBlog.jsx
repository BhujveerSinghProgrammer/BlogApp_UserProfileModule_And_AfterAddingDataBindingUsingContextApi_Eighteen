
import Base from '../components/Base';
import React, { useEffect, useState,useContext,useRef } from 'react'
import userContext from "../context/userContext";
import { useNavigate, useParams } from 'react-router-dom';
import { loadPostsById, UpdatePost,uploadPostImage } from '../services/post-service';
import { toast } from 'react-toastify';

import { Card, CardBody, Input, Form, Label, Container, Button } from "reactstrap";
import { loadAllCategories } from "../services/category-service";
import JoditEditor from "jodit-react";


function UpdateBlog() {

const editor = useRef(null);

const {Id}=useParams();
console.log('Alpha 3',Id);
const object=useContext(userContext);
const navigate=useNavigate();
const[post,setPost]=useState(null);

const [categories, setCategories] = useState([]);

const [image, setImage] = useState(null);

// Handle file change for the image
  const handleFileChange = (event) => {
    console.log(event.target.files[0]);
    setImage(event.target.files[0]);
  };

useEffect(()=>{
  //Load all categories
  loadAllCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });


  //Load the blog from database
loadPostsById(Id).then(data=>{
  console.log('A1',data);
   console.log('A2',object);
  setPost({...data})
}).catch(error=>{
  console.log(error);
  toast.error('error in loading the posts')
})


},[])



//Check if its your content or not

useEffect(() => {
  console.log('Alpha 1', post);
  // Check if post and object.user.data are available
  if (post && object.user && object.user.data) {
    console.log('Alpha 2', object.user.data.Id);

    if (post.userId !== object.user.data.Id) {
      console.log(object.user.data.Id);
      console.log(post.userId);
      toast.error('This is not your content!!');
      navigate('/');
    }
  }
}, [post]);




  // Update post function
  const UpdationOfPost = (event) => {
    event.preventDefault();

    // Form validation
    if (post.Title.trim() === '') {
      alert('Title is required!');
      return;
    }
    if (post.Content.trim() === '') {
      alert('Content is required!');
      return;
    }
    if (post.CategoryId === '') {
      alert('Select a category!');
      return;
    }
    if (!image) {
      alert('Please select an image!');
      return;
    }

    // Submit the post form
    UpdatePost(post)
      .then(data => {
        console.log('Post Updated successfully', data);

        // Upload the image after post creation
        uploadPostImage(image, data.postId)
          .then(() => {
            toast.success("Image uploaded successfully!");
          })
          .catch((error) => {
            toast.error("Image upload failed!");
          });

        toast.success(data.mgs); // Show success message for post creation
        navigate('/');
      })
      .catch((error) => {
        toast.error("Post creation failed!");
      });
  };


const handleChange=(event,fieldName)=>{
  setPost({
    ...post,[fieldName]:event.target.value
  })
}


 const updateHtml=()=>{
  return(
 <div className="wrapper my-3">
      <Card className="shadow mt-3">
        <CardBody>
          <h3>Update Post from here!!</h3>
          {JSON.stringify(post)}
          <Form onSubmit={UpdationOfPost}>
            <div className="my-3">
              <Label for="title">Post Title</Label>
              <Input
                type="text"
                id="title"
                placeholder="Enter Here"
                className="rounded-0"
                name="title"
                value={post.Title}
                onChange={(event)=>handleChange(event,'Title')}
              />
            </div>

            <div className="my-3">
              <Label for="content">Post Content</Label>
              <JoditEditor
                 ref={editor}
                 value={post.Content}
                 tabIndex={1}
                 onChange={newContent=>setPost({...post,Content:newContent})}
              />
            </div>

            {/* File upload field */}
            <div className="mt-3">
              <Label for="image">Select Post Banner</Label>
              <Input
                id="image"
                type="file"
                onChange={handleFileChange}


              />
            </div>

            <div className="my-3">
              <Label for="category">Post Category</Label>
              <Input
                type="select"
                id="category"
                className="rounded-0"
                placeholder='Enter Here'

                name="categoryid"
                onChange={(event)=>handleChange(event,'CategoryId')}  
                 value={post.CategoryId}
              >
                <option value="">Select a category</option> {/* Placeholder option */}
                {categories.map((category) => (
                  <option value={category.Id} key={category.Id}>
                    {category.CategoryName}
                  </option>
                ))}
              </Input>
            </div>

            <Container className="text-center">
              <Button type="submit" style={{ height: '31px ',width: '87px ',padding: '0px ', fontSize:'15px',color:'Yellow'}} className="rounded-0" color="primary">
                Update Post
              </Button>
              <Button style={{ height: '31px ',width: '87px ',padding: '0px ', fontSize:'15px',color:'Yellow'}} type="button" onClick={''} className="rounded-0 ms-2" color="danger">
                Reset
              </Button>
            </Container>
          </Form>
        </CardBody>
      </Card>
    </div>

  )
 }

  return (
    <Base>
         <Container>
          {/* we will show the html when we have the values in post */}
      {post && updateHtml()} 
        </Container>
    </Base>

  )
}

export default UpdateBlog
