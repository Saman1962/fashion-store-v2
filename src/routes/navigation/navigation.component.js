import {getRedirectResult} from "firebase/auth";
import {Fragment, useEffect} from "react";
import {Link, Outlet} from "react-router-dom";

import {ReactComponent as Logo} from "../../assets/logo.svg";

import "./navigation.styles.scss";
import {auth, createUserDocumentFromAuth, signInWithGooglePopup} from "../../utils/firebase/firebase.utils";

const Navigation = () => {
    useEffect(async () => {
        const response = await getRedirectResult(auth);
        if (response) {
            await createUserDocumentFromAuth(response.user);
        }
    },[])
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }
    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to="/">
                    <Logo className="logo"/>
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to="/shop">
                        SHOP
                    </Link>
                </div>
                <div className="nav-links-container">
                    <Link className="nav-link" to="/auth">
                        SIGN-IN
                    </Link>
                </div>
            </div>
            <Outlet/>
        </Fragment>
    )
}

export default Navigation;