import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import PostWidget from 'scenes/widgets/PostWidget';

const Recommendations = ({ userId }) => {
    // const [contentBased, setContentBased] = useState([]);
    // const [popular, setPopular] = useState([]);
    // const [collaborative, setCollaborative] = useState([]);
    const [recommendedPosts, setRecommendedPosts] = useState([]);
    const token = useSelector((state) => state.token);

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:3001',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const response = await axiosInstance.get('/api/recommend/hybrid', { params: { user_id: userId } });
                setRecommendedPosts(response.data);

                // const contentResponse = await axiosInstance.get('/api/recommend/content', { params: { user_id: userId } });
                // setContentBased(contentResponse.data);

                // const popularResponse = await axiosInstance.get('/api/recommend/popular');
                // setPopular(popularResponse.data);

                // const collaborativeResponse = await axiosInstance.get('/api/recommend/collaborative', { params: { user_id: userId } });
                // setCollaborative(collaborativeResponse.data);
            } catch (error) {
                console.error('Failed to fetch recommendations', error);
            }
        };

        fetchRecommendations();
    }, [userId, axiosInstance]);

    return (
        <div>
            <h2>Recommended Posts</h2>
            {recommendedPosts.length === 0 ? (
                <p>No recommendations available.</p>
            ) : (
                <ul>
                    {recommendedPosts.map(
                        ({
                            _id,
                            userId,
                            firstName,
                            lastName,
                            description,
                            location,
                            picturePath,
                            userPicturePath,
                            likes,
                            comments,
                        }) => (
                            <PostWidget
                                key={_id}
                                postId={_id}
                                postUserId={userId}
                                name={`${firstName} ${lastName}`}
                                description={description}
                                location={location}
                                picturePath={picturePath}
                                userPicturePath={userPicturePath}
                                likes={likes}
                                comments={comments}
                            />
                        )
                    )}
                </ul>
            )}
        </div>
    );
};

export default Recommendations;













// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
// //import PostWidget from 'scenes/widgets/PostWidget';

// const Recommendations = ({ userId }) => {
//     const [contentBased, setContentBased] = useState([]);
//     const [popular, setPopular] = useState([]);
//     const [collaborative, setCollaborative] = useState([]);

//     useEffect(() => {
//         const fetchRecommendations = async () => {
//             try {
//                 const contentResponse = await axios.get(`/api/recommend/content`, { params: { user_id: userId } });
//                 setContentBased(contentResponse.data);

//                 const popularResponse = await axios.get(`/api/recommend/popular`);
//                 setPopular(popularResponse.data);

//                 const collaborativeResponse = await axios.get(`/api/recommend/collaborative`, { params: { user_id: userId } });
//                 setCollaborative(collaborativeResponse.data);
//             } catch (error) {
//                 console.error('Failed to fetch recommendations', error);
//             }
//         };

//         fetchRecommendations();
//     }, [userId]);

//     return (
//         <div>
//             <h2>Content-Based Recommendations</h2>
//             <ul>
//                 {contentBased.map(post => (
//                     <li key={post._id}>{post.description}</li>
//                 ))}
//             </ul>

//             <h2>Popular Posts</h2>
//             <ul>
//                 {popular.map(post => (
//                     <li key={post._id}>{post.description}</li>
//                 ))}
//             </ul>

//             <h2>Collaborative Filtering Recommendations</h2>
//             <ul>
//                 {collaborative.map(post => (
//                     <li key={post._id}>{post.description}</li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default Recommendations;



// // frontend/src/components/Recommendations.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
// import PostWidget from 'scenes/widgets/PostWidget';



// const Recommendations = ({ userId }) => {
//     const [recommendedPosts, setRecommendedPosts] = useState([]);
//     const token = useSelector((state) => state.token);
    
    
//     const axiosInstance = axios.create({
//         baseURL: 'http://localhost:3001',
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     });
    
    
//     useEffect(() => {
//         const fetchRecommendations = async () => {
//             try {console.log(`Fetching recommendations for user: ${userId}`);
//                 const response = await axiosInstance.get(`/api/recommend/${userId}`);
//                 console.log("recommendations received from backend",response.data);
//                 setRecommendedPosts(response.data);
//             } catch (error) {
//                 console.error('Error fetching recommendations', error);
//             }
//         };

//         fetchRecommendations();
//     }, [userId, axiosInstance]);

//     return (
//         <div>
//             <h2>Recommended Posts</h2>
//             {recommendedPosts.length === 0 ? (
//             <p>No recommendations available.</p>
//         ) : (
//             <ul>
//                 {recommendedPosts.map(
//         ({
//           _id,
//           userId,
//           firstName,
//           lastName,
//           description,
//           location,
//           picturePath,
//           userPicturePath,
//           likes,
//           comments,
//         }) => (
//           <PostWidget
//             key={_id}
//             postId={_id}
//             postUserId={userId}
//             name={`${firstName} ${lastName}`}
//             description={description}
//             location={location}
//             picturePath={picturePath}
//             userPicturePath={userPicturePath}
//             likes={likes}
//             comments={comments}
//              //onView={() => handlePostView(_id)} // Record interaction when the post is viewed
//           />
                    
                    
//                     // <li key={post._id}> 
//                     // <h3>{post.description}</h3>
//                     // </li>
//                 ))}
//             </ul>)}
//         </div>
//     );
// };

// export default Recommendations;
