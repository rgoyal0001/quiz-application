import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";


import "./Goal.css";

async function getGoal(title){
  const response=await fetch(`https://unacadmey-test-app.herokuapp.com/goal/${title}`)
  .catch((err)=>{
    console.log(err)
  });
  const data =await response.json();
  // const courseTitle=data.goal[0].title;
  // console.log(data.goal[0].title)
  console.log(data.goal[0].title)
  return data;
}


export const Goal = () => {
  const params=useParams();
  const [goalData,setGoalData]=React.useState()
  const [freeClass,setFreeClass]=React.useState([])
  const [topEducator,setTopEducator]=React.useState([])

  const SECRET = "yutuyghguyjksttyyy";

  const [subscribeUser, setSubscribeUser] = React.useState([])

  let token = localStorage.getItem('token');

       async function getUserById(id){
        try {  
        let res = await fetch(`https://unacadmey-test-app.herokuapp.com/getUser/${id}`);
          let data = await res.json();
             let subscription = data.user.subscription.filter((eachSub)=> {
                return eachSub.title === params.title
                  
             })
             setSubscribeUser(subscription)
            
        }catch(err){
            console.log(err);
        }
    }


  React.useEffect(() => {
      if (token) {
          const decoded_user = jwt_decode(token, SECRET);
          getUserById(decoded_user.id)
      
      } else {
         
          console.log("token not found");
      }
  }, [token])

console.log(subscribeUser);

  useEffect(()=>{
    getGoal(params.title).then(response=>{
      setGoalData(response.goal[0])
      setFreeClass(response.goal[0].freeClases)
      setTopEducator(response.goal[0].topEducators)
      // console.log(response.goal[0].freeClases)
      // console.log(response.goal[0])
      // console.log("dcn",freeClass)
    })
  },[])
  return (
    <div id="container">
      <div className="first-box">
        <div className="first-box-item1">
          <img alt="" src={require("./boy.svg").default} />
        </div>
        <div className="first-box-item2">
          <div>
            <a href="/">
              <button className="first-box-item2-1-btn">
                <img src="https://static.uacdn.net/production/_next/static/images/winter-logo.svg?q=75&w=48" alt="" /> 
                <p>Experience our 2021 recap</p>
              </button>
            </a>
            <h1 id="heading">
              Crack {goalData?.title} with India's largest learning platform
            </h1>
            <h3>
            Get Plus subscription and access unlimited live and recorded courses from India's best educators

            </h3>
             {subscribeUser.length == 0?(<Link to={`/goal/subscription/${goalData?.title}`}>
              <button className="first-box-item2-2-btn">
                Get subscription
              </button>
            </Link>):(<Link to={`/goal/see-subscription/${goalData?.title}`}>
              <button className="first-box-item2-2-btn">
                See subscription
              </button>
            </Link>)}
          </div>
        </div>
        <div className="first-box-item3">
          <img alt="" src={require("./girl.svg").default} />
        </div>
      </div>
      <div className="second-section">
        <div>
          <h2>What you'll get</h2>
          <div className="second-section-card">
            <div className="second-section-card-item flex">
              <div>
                <img
                  src="https://static.uacdn.net/web-cms/benefitchat_1b0a84e281.svg?q=75&w=256&fm=webp"
                  alt=""
                />
              </div>
              <div>
                <h3>{goalData?.youWillGet[0].title}</h3>
                <h5>{goalData?.youWillGet[0].text} </h5>
              </div>
            </div>
            <div className="second-section-card-item flex">
              <div>
                <img
                  src="	https://static.uacdn.net/web-cms/benefitcourses_cceb8214b5.svg?q=75&w=256&fm=webp"
                  alt=""
                />
              </div>
              <div>
                <h3>{goalData?.youWillGet[1].title}</h3>
                <h5>{goalData?.youWillGet[1].text} </h5>
              </div>
            </div>
            <div className="second-section-card-item flex">
              <div>
                <img
                  src="	https://static.uacdn.net/web-cms/benefittest_d542d8446b.svg?q=75&w=256&fm=webp"
                  alt=""
                />
              </div>
              <div>
                <h3>{goalData?.youWillGet[2].title}</h3>
                <h5>{goalData?.youWillGet[2].text} </h5>
              </div>
            </div>
            <div className="second-section-card-item flex">
              <div>
                <img
                  src="	https://static.uacdn.net/web-cms/benefitaccess_9a0fb1469f.svg?q=75&w=256&fm=webp"
                  alt=""
                />
              </div>
              <div>
                <h3>{goalData?.youWillGet[3].title}</h3>
                <h5>{goalData?.youWillGet[3].text} </h5>
              </div>
            </div>
          </div>
          <div className="pricing">
            <div className="pricing-item1">
              <h4>
              {goalData?.title} subscription starts <br />
                from <span>₹908/month</span>
              </h4>
            </div>
            <div className="pricing-item1">
              <a href="/" >
                <h5>View pricing</h5>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="notification-image">
        <img src="https://static.uacdn.net/thumbnail/banner/09d05e8f7f834010951842fdf0ac5b5c.png?q=75&w=1000&fm=webp" alt="" />
      </div>

      {/*.......Free Classes.........*/}

      <div className="free-classes">
        <div className="free-classes-header">
          <div>
            <h1>Free classes</h1>
            <p>Watch free classes from top educators</p>
          </div>
          <div>
            <a href="">See all</a>
          </div>
        </div>
        <div className="free-classes-educators-list">
        {freeClass.map((el , index) => {
          return (
            <div key = {index} className="educator">
              <div className="educator-image">
                <img src={el.imageUrl} alt="" />
              </div>
              <div className="educator-details">
                <p style={{fontSize:"12px", fontWeight:"600",color:"rgb(64, 64, 64)"}}> {el.language} <span style={{color:"rgb(224, 77, 77)", marginLeft:"1rem"}}> {el.subject} </span> </p>
                <p style={{ fontWeight:"650", color:"rgb(64, 64, 64)"}}> {el.text} </p>
                <p style={{fontSize:"13px", color:"grey"}}> {el.time} </p>
                <p style={{}}> {el.name} </p>
              </div>
            </div>
          )
        })}
        </div>
      </div>

      {/* .......Top Educators...... */}
      
      <div className="free-classes">
        <div className="free-classes-header">
            <div>
              <h1>Prepare with Top Educators</h1>
              <p>Access to India's best IIT-JAM educators is just a subscription away</p>
            </div>
            <div>
              <a href="">See all</a>
            </div>
        </div>
        <div className="top-educators-list">
        {topEducator.map((el , index) => {
          return (
            <div key = {index} className="educator">
              <div className="topEducator-image">
                <img src={el.imageUrl} alt="" />
              </div>
              <div className="educator-details">
                <p style={{fontWeight:"650", color:"rgb(64, 64, 64)"}}> {el.name} </p>
                <p style={{fontSize:"12px", fontWeight:"600",color:"rgb(64, 64, 64)"}}> {el.text} </p>
              </div>
            </div>
          )
        })}
        </div>
      </div>

      {/* .....Third Section... */}
      <section className="third-section">
        <div>
          <div className="third-section-first-box flex">
            <div className="third-section-first-box-item1">
              <div>The best way to prepare for {goalData?.title}
              <br />
                <a href="/">Get subscription</a>
              </div>
              
            </div>
            <div className="third-section-first-box-item2">
              <video
                loop
                muted
                autoPlay
                playsInline
                className="css-fznx3g-Video eo1zmk14"
              >
                <source
                  data-src="https://static.uacdn.net/web-cms/schedule_055b9bfa23.webm"
                  type="video/webm"
                  src="https://static.uacdn.net/web-cms/schedule_055b9bfa23.webm"
                />
                <source
                  data-src="https://static.uacdn.net/web-cms/schedule_fe9ee5d4e7.mp4"
                  type="video/mp4"
                  src="https://static.uacdn.net/web-cms/schedule_fe9ee5d4e7.mp4"
                />
              </video>
              <h4>Schedule that works for you</h4>
              <p>
                Enroll in unlimited courses, get a personalised schedule and
                never miss a live class with our timely reminders
              </p>
              <video
                loop
                muted
                autoPlay
                playsInline
                className="css-fznx3g-Video eo1zmk14"
              >
                <source
                  data-src="https://static.uacdn.net/web-cms/language_d56e370f78.webm"
                  type="video/webm"
                  src="https://static.uacdn.net/web-cms/language_d56e370f78.webm"
                />
                <source
                  data-src="https://static.uacdn.net/web-cms/language_9bdb488c01.mp4"
                  type="video/mp4"
                  src="https://static.uacdn.net/web-cms/language_9bdb488c01.mp4"
                />
              </video>
              <h4>No Language barrier</h4>
              <p>
                Our educators teach in English, Hindi, Malayalam, Tamil and 12
                other languages, so language is never a barrier
              </p>
              <video
                loop
                muted
                autoPlay
                playsInline
                className="css-fznx3g-Video eo1zmk14"
              >
                <source
                  data-src="https://static.uacdn.net/web-cms/practice_2202d81863.webm"
                  type="video/webm"
                  src="https://static.uacdn.net/web-cms/practice_2202d81863.webm"
                />
               
              </video>
              <h4>Learn anytime, anywhere</h4>
              <p>Watch our recorded classes, online or offline from the comfort of your mobile, PC or tablet</p>
            </div>
          </div>
          <div className="third-section-first-box flex">
            <div className="third-section-first-box-item1">
              <div>
                Feels like you are in the classroom
              <br />
                <a href="/">Get subscription</a>
              </div>
              
            </div>
            <div className="third-section-first-box-item2">
              <video
                loop
                muted
                autoPlay
                playsInline
                className="css-fznx3g-Video eo1zmk14"
              >
                <source
                  data-src="https://static.uacdn.net/web-cms/polls_362dafb5eb.webm"
                  type="video/webm"
                  src="https://static.uacdn.net/web-cms/chatting_f25584317b.webm"
                />
               
              </video>
              <h4>Interact with your educator</h4>
              <p>Chat with the educator, engage in discussions and ask your questions - all while the class is going on</p>
              <video
                loop
                muted
                autoPlay
                playsInline
                className="css-fznx3g-Video eo1zmk14"
              >
                <source
                  data-src="https://static.uacdn.net/web-cms/polls_362dafb5eb.webm"
                  type="video/webm"
                  src="https://static.uacdn.net/web-cms/polls_362dafb5eb.webm"
                />
               
              </video>
              <h4>Answer live polls</h4>
              <p>Participate in live pools by the educator in class and compete for a place in the leaderboard</p>
              
              <video
                loop
                muted
                autoPlay
                playsInline
                className="css-fznx3g-Video eo1zmk14"
              >
                <source
                  data-src="https://static.uacdn.net/web-cms/question_9baa1f946f.mp4"
                  type="video/mp4"
                  src="https://static.uacdn.net/web-cms/question_9baa1f946f.mp4"
                />
               
              </video>
              <h4>Get your doubts cleared</h4>
              <p>Ask your doubts and get them answered immediately by the educator during classes</p>

            </div>
          </div>
          <div className="third-section-first-box flex">
            <div className="third-section-first-box-item1">
              <div>
              A subscription that's more than just classes
              <br />
                <a href="/">Get subscription</a>
              </div>
              
            </div>
            <div className="third-section-first-box-item2">
              <video
                loop
                muted
                autoPlay
                playsInline
                className="css-fznx3g-Video eo1zmk14"
              >
                <source
                  data-src="https://static.uacdn.net/web-cms/testseries_17b34f8aec.webm"
                  type="video/webm"
                  src="https://static.uacdn.net/web-cms/testseries_17b34f8aec.webm"
                />
               
              </video>
              <h4>Live tests and quizzes</h4>
              <p>Take live mock tests curated in line with the exam pattern to measure your progress, and stay on track</p>
              <video
                loop
                muted
                autoPlay
                playsInline
                className="css-fznx3g-Video eo1zmk14"
              >
                <source
                  data-src="https://static.uacdn.net/web-cms/analytics_96e889f457.mp4"
                  type="video/mp4"
                  src="https://static.uacdn.net/web-cms/analytics_96e889f457.mp4"
                />
               
              </video>
              <h4>Detailed report and analysis</h4>
              <p>Get in-depth insights with topic wise scores, time spent per question and competitive stats</p>
              
              <video
                loop
                muted
                autoPlay
                playsInline
                className="css-fznx3g-Video eo1zmk14"
              >
                <source
                  data-src="https://static.uacdn.net/web-cms/pdf_650d0a3977.webm"
                  type="video/webm"
                  src="https://static.uacdn.net/web-cms/pdf_650d0a3977.webm"
                />
               
              </video>
              <h4>PDFs and learning material</h4>
              <p>Get access to class notes with educator annotations for you to revisit and revise anytime</p>

            </div>
          </div>
        </div>
      </section>
      
      {/* .....Fourth Section... */}
      <section className="fourth-section">
        <div>
          <h1>{goalData?.title} Subscription</h1>
          <div className="course-fee">
            <p>
              12 months <br /> ₹80,000 Total <br /> (Incl. of all taxes)
              <br />
              <button>Subscription</button>
            </p>
          </div>
          <h4>Have questions? <a>Read our FAQs</a></h4>
        </div>
      </section>
      {/* .....Fifth Section... */}
      <section className="fifth-section">
        <div>
          <div className="fifth-section-first-box">
            <div className="fifth-section-first-box-item1">
              <div>
                <h1>Get the learning app</h1>
                <h4>
                  Download lessons and learn anytime, anywhere with the
                  Unacademy app
                </h4>
                <div className="block4">
                  <div className="block41">
                    <div className="block411">
                      Get the learning
                      <br /> app
                    </div>
                    <div className="block412">
                      Download lessons and learn anytime,
                      <br /> anywhere with the Unacademy app
                    </div>
                    <div className="block413">
                      <a href="https://apps.apple.com/in/app/unacademy-learning-app/id1342565069?referrer%3Dutm_source%253DFooter%2526utm_medium%253DWebApp%2526utm_campaign%253DFooter%2526">
                        <img
                          src="https://static.uacdn.net/production/_next/static/images/app_store.png?q=75&w=1920"
                          alt="playstore"
                        />
                      </a>
                      <a href="https://play.google.com/store/apps/details?id=com.unacademyapp&referrer=utm_source%3DFooter%26utm_medium%3DWebApp%26utm_campaign%3DFooter%26">
                        <img
                          src="https://static.uacdn.net/production/_next/static/images/play_store.png?q=75&w=1920"
                          alt="playstore"
                        />
                      </a>
                    </div>
                  </div>
                  <div className="block42">
                    <img
                      src="https://static.uacdn.net/production/_next/static/images/newApp.png?q=75&w=640"
                      alt="mobile"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};