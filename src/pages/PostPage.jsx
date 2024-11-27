import React, { useEffect, useState } from 'react'; 
import Base from '../components/Base';
import { Link, useParams } from 'react-router-dom';
import { loadPostsById } from '../services/post-service';
import { toast } from 'react-toastify';
import { Card, CardBody, CardText, Col, Container, Input, Row, Button } from 'reactstrap';
import { createCommentPost, loadCommentsByContentId } from '../services/post-service';
import { isLoggedIn } from '../auth';
import { BASE_URL } from '../services/helper';
const PostPage = () => {
  const { Id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]); // Store the list of comments,fo binding comments
  const [commentpost, setCommentpost] = useState({
    Comment: "",
    CategoryId: "",
    ContentId: "",
    UserId: ""
  }); // this is for insertion of comments

  // Loading Post...
  useEffect(() => {
    loadPostsById(Id)
      .then((data) => {
        console.log('Post Data:', data);
        setPost(data);
        setCommentpost({
          ...commentpost,
          CategoryId: data.CategoryId,
          ContentId: data.Id,
          UserId: data.userId
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error('Error in Loading Post');
      });
  }, [Id]);

  // Loading Comments...
  useEffect(() => {
    loadCommentsByContentId(Id)
      .then((data) => {
        console.log('Comments Data:', data);
        // Ensure comments data is an array
        if (Array.isArray(data)) {
          setComments(data);
        } else {
          setComments([]);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error('Error in Loading Comments');
      });
  }, [Id]);

  // Handle field change:- event will automatically come to function as parameter.
  const fieldChanged = (event) => {
    setCommentpost({
      ...commentpost,
      Comment: event.target.value
    });
  };

  // Handle submitting the comment
  const createPost = (event) => {
    if(!isLoggedIn())
    {
          setCommentpost({
            ...commentpost,
            Comment: "", // Clear the input field
          });
      toast.error('Login first to add comments!!');
      return;
    }
    event.preventDefault();
    if (commentpost.Comment.trim() === '') {
      toast.error('Comment is required!');
      return;
    }

    // Submit the form to the server
    createCommentPost(commentpost)
      .then((response) => {
        console.log('API response after submitting comment:', response);

        if (response.Error === "Ok") {
          // Manually create a new comment object
          const newComment = {
            Comment: commentpost.Comment,
            UserId: commentpost.UserId,
            CategoryId: commentpost.CategoryId,
            ContentId: commentpost.ContentId,
            email: "example@domain.com",  // Replace with actual email if available
            name: "User Name", // Replace with actual name if available
            Doe: new Date().toISOString(), // Current date as the comment date
            udt: new Date().toISOString() // Current date as update timestamp
          };

          setComments([newComment, ...comments]); // Add new comment to list
          setCommentpost({
            ...commentpost,
            Comment: "", // Clear the input field
          });
          toast.success('Comment posted successfully!');
        } else {
          toast.error('Failed to post comment: ' + response.mgs);
        }
      })
      .catch((error) => {
        toast.error('Error submitting comment');
        console.log(error);
      });
  };

  if (!post) {
    return <div>Loading post...</div>;
  }

  return (
    <Base>
      <Container className="mt-2 mb-2">
        <Link to="/">Home</Link> / {post && <Link to="#">{post.CategoryName}</Link>}
        <Row>
          <Col md={12}>
            <Card className="mt-3 ps-2 border-0">
              <CardBody>
                <CardText>
                  Posted By <b style={{ color: 'Green' }}>{post.name}</b> on{' '}
                  <b style={{ color: 'Orange' }}>{new Date(post.Doe)?.toLocaleDateString()}</b>
                </CardText>
                <CardText className="mt-2 mb-1">
                  <span className="text-muted">Category - {post.CategoryName}</span>
                </CardText>
                <div className="divider" style={{ width: '100%', height: '1px', background: 'green', marginBottom: '3px' }} />
                <CardText>
                  <h4><b>{post.Title}</b></h4>
                </CardText>
                <div className="image-container mt-2 mb-3" style={{ maxWidth: '40%', height: '10%' }}>
                  {/* <img src={post.ImageName?'https://nulm.gov.in/images/SlideImage/' + post.ImageName: 'https://nulm.gov.in/images/SlideImage/' + "10.jpg"} alt={post.Title} style={{ width: '100%' }} /> */}

                  <img 
                  src={post.ImageName ? `${BASE_URL}/api/ReactJsApis/GetImage?imageName=${post.ImageName}` : 'https://nulm.gov.in/images/SlideImage/10.jpg'} 
                  alt={post.Title} 
                 style={{ maxWidth: '40%', height: '10%' }}
                  />

{/* http://localhost:53719/api/ReactJsApis/GetImage?imageName=1_07dc3403-9c1f-4686-b7da-55e368d77345.png */}

                </div>
                <CardText dangerouslySetInnerHTML={{ __html: post.Content }} className="mt-2" />
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* Comments Section */}
        <Row className="mt-0" style={{ backgroundColor: 'whitesmoke' }}>
          <Col md={{ size: 9, offset: 0 }}>
            <h4 style={{ color: 'green' }}>
              Comments ({comments.length > 0 ? comments.length : 0})
            </h4>
            {comments.length > 0 ? (
              comments.map((c, index) => (
                <Card className="mt-0 border-0" key={index}>
                  <CardBody>
                    {c.Comment}
                    <br />
                    <h6 style={{ color: 'blue',fontSize:'11px' }}>{c.email}</h6>
                  </CardBody>
                </Card>
              ))
            ) : (
              <p>No comments yet!</p>
            )}
            <Card className="mt-0 border-0">
              <CardBody>
                <Input
                  type="textarea"
                  id="Comment"
                  name="Comment"
                  value={commentpost.Comment}
                   onChange={fieldChanged}  //Both will work
                  //onChange={(event)=>setCommentpost({...commentpost,Comment: event.target.value})}
                  //onChange={(event)=>setCommentpost(event.target.value)} // if we have only single key in our json object like given below:-const [commentpost, setCommentpost] = useState({Comment: "" });
                  

                  placeholder="Enter Comments Here"
                />
                <Button
                  className="mt-2"
                  onClick={createPost}
                  style={{ marginTop: '5px' }}
                  color="primary"
                >
                  Submit
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default PostPage;
