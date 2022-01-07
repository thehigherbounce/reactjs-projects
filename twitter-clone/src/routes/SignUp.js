import styles from "./SingUp.module.css";
import { BsTwitter } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import SignUpBtn from "../components/SignUpBtn";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { signInWithEmail, signInWithGoogle } from "../firebase";
import { useContext } from "react";
import { UserContext } from "../hooks/UserContext";

const SignUp = () => {
  //const twitterBg =
  //"https://abs.twimg.com/sticky/illustrations/lohp_en_1302x955.png";
  const { setUser } = useContext(UserContext);
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((res) => {
        console.log(res);
        const userInfo = {
          username: res.user.displayName,
          email: res.user.email,
          profile: res.user.photoURL,
        };
        setUser(userInfo);
        localStorage.setItem("twitter-clone", JSON.stringify(userInfo));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEmailSignIn = () => {
    signInWithEmail("test@mail.com", "NOPASS").then((res) => console.log(res));
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.twitter}>
          <BsTwitter />
        </div>
        <div className={styles.signup}>
          <BsTwitter className={styles.logo} />
          <h1 className={styles.title}>Happening now</h1>
          <h2 className={styles.subtitle}>Join Twitter today.</h2>
          <div className={styles.buttons}>
            <SignUpBtn
              Icon={FcGoogle}
              text="Sign up with Google"
              bgColor="#FFF"
              action={handleGoogleSignIn}
            />
            <SignUpBtn
              Icon={BsTwitter}
              text="Sign up with Twitter"
              bgColor="rgb(29, 154, 240)"
              color="#FFF"
            />
            <div className={styles.or}>
              <hr />
              <p>or</p>
              <hr />
            </div>
            <SignUpBtn
              text="Sign up with email"
              bgColor="#FFF"
              color="#000"
              action={handleEmailSignIn}
            />
            <p className={styles.terms}>
              By signing up, you agree to the{" "}
              <Link to="#">Terms of Service</Link> and{" "}
              <Link to="#">Privacy Policy</Link>, including{" "}
              <Link to="#">Cookie Use</Link>.
            </p>

            <h3 className={styles.login}>Already have and account?</h3>
            <SignUpBtn
              text="Sign In"
              bgColor="transparent"
              color="rgb(var(--accent-color))"
              border
              bold
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;