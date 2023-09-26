import React, { useEffect, useState } from "react";
import { Card, Form, Row, Col, Button, FloatingLabel, Toast } from "react-bootstrap";
import Footer from "../Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import cardArt from '../../image/cardArtBackground.jpg';
import logoSmall from '../../image/greenFrog.png'
import { listPosts } from "../../actions/postActions"
import { subribbitDetailAction } from "../../actions/subribbitActions";
import Post from "../Posts/Post"
import Loader from "../Utilities/Loader"
import Message from "../Utilities/Message"
import UserNavbar from "../Navbar/UserNavbar"
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from "axios";
import HomeSideBar from '../SideBar/HomeSideBar'
import SuccessToast from "../Toasts/SuccessToast";
import { DELETE_POST_RESET } from "../../actions/types";
import SubribbitSideBar from "../SideBar/SubribbitSideBar";
import InformationSideBar from "../SideBar/InformationSideBar";
import HomeSubSideBar from "../SideBar/HomeSubSideBar";
import CommunityNoPostsYet from "../Utilities/CommunityNoPostsYet";
import GeneralGetErrorPage from "../Utilities/GeneralGetErrorPage";

function ExplorePage() {
    const match = useParams()
    const dispatch = useDispatch();
    const location = useLocation();
    const [sortCounter, setSortCounter] = useState(0);

    const sub = '-'

    const parameterSearch = useLocation().search
    const sort = new URLSearchParams(parameterSearch).get('sort')

    const [search, setSearch] = useState("");

    const postList = useSelector(state => state.postList)
    const { error, loading, posts } = postList

    const deletePost = useSelector(state => state.deletePost)
    const { message: messageDeletePost } = deletePost

    const updateSubribbit = useSelector(state => state.updateSubribbit)
    const { loading: loadingUpdateSubribbit, error: errorUpdateSubribbit, subribbit: updateSubribbitData } = updateSubribbit

    useEffect(() => {
        dispatch(listPosts('-', sort, search))
    }, [messageDeletePost, sort, sortCounter, updateSubribbitData, search]) // passing match.sub here so that if match.sub changes, useEffect will be called. Read more: https://reactjs.org/docs/hooks-effect.html

    function getSortLink(sortValue) {
        var sortLink = '/explore?sort=' + sortValue
        return sortLink
    }

    function checkPostEmpty() {
        if (posts.length < 1 && search === "") return true;
        return false;
    }

    // get userLogin from state 
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    return (

        <div class="container-fluid px-0">
            <UserNavbar />
            <div id="page-size">
                <div class="col-md-8 offset-md-2">
                    {
                        (!loading && error) ?
                            (
                                <GeneralGetErrorPage />
                            )
                            :
                            (
                                <div class="row pt-5">
                                    <div class="col-md-7">
                                        <div class="row">
                                            <div class="card" id="searchTitle" align="left">
                                                <Form.Control
                                                    required
                                                    type="search"
                                                    placeholder="Search a post title"
                                                    value={search}
                                                    onChange={(e) => setSearch(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="card" id="chooseFilter" align="left">
                                                <div class="d-flex flex-row p-2">
                                                    <div>
                                                        <Link to={getSortLink('latest')}>
                                                            <button type="button" class="btn btn-primary btn-sm" onClick={() => {
                                                                setSearch('')
                                                                setSortCounter(sortCounter + 1)
                                                            }}>
                                                                <i class="far fa-clock"></i>&nbsp;&nbsp;Latest
                                                            </button>
                                                        </Link>
                                                        &nbsp; &nbsp;
                                                    </div>
                                                    <div>
                                                        <Link to={getSortLink('numComments')}>
                                                            <button type="button" class="btn btn-secondary btn-sm" onClick={() => {
                                                                setSearch('')
                                                                setSortCounter(sortCounter + 1)
                                                            }}>
                                                                <i class="fas fa-fire-alt"></i>&nbsp;&nbsp;Most Comments
                                                            </button>
                                                        </Link>
                                                        &nbsp; &nbsp;
                                                    </div>
                                                    <div>
                                                        <Link to={getSortLink('rating')}>
                                                            <button type="button" class="btn btn-warning btn-sm" onClick={() => {
                                                                setSearch('')
                                                                setSortCounter(sortCounter + 1)
                                                            }}>
                                                                <i class="fas fa-award"></i>&nbsp;&nbsp;Most Upvote
                                                            </button>
                                                        </Link>
                                                        &nbsp;
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <center>
                                                {
                                                    (search !== "") ?
                                                        (
                                                            <div>
                                                                <small>Showing search result for: <i>{search}</i>
                                                                    <button id="clearSearchButton" onClick={() => setSearch("")}>&nbsp;&nbsp;<b>Clear</b></button>
                                                                </small>
                                                            </div>
                                                        )
                                                        : null
                                                }
                                            </center>
                                        </div>

                                        {loading ? <Loader />
                                            : error ? <Message color='danger'>{error}</Message>
                                                :
                                                <div>
                                                    {
                                                        checkPostEmpty() ?
                                                            (
                                                                <CommunityNoPostsYet sub="-" />
                                                            )
                                                            :
                                                            (
                                                                <div>
                                                                    {posts.map(post => (
                                                                        <Row>
                                                                            <Post post={post} sub={sub} />
                                                                        </Row>
                                                                    ))}
                                                                </div>
                                                            )
                                                    }
                                                </div>
                                        }
                                    </div>
                                    <div class="col-md-5">
                                        <HomeSideBar />
                                        <InformationSideBar />
                                    </div>
                                </div>
                            )
                    }
                </div>

            </div>

            <Footer />
        </div>
    );
}

export default ExplorePage;
