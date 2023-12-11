import React, { useState } from "react";
import axios, { Axios } from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import video from "../assets/video.mp4";
import { IoPlayCircleSharp } from "react-icons/io5";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BsCheck } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
export default function Card({ movieData, isLiked = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const Navigate = useNavigate();
  const [email, setEmail] = useState(undefined);

  onAuthStateChanged(firebaseAuth, (updateCurrentUser) => {
    if (updateCurrentUser) setEmail(updateCurrentUser.email);
    else Navigate("/login");
  });

  const addToList = async () => {
    try {
      await axios.post("https://localhost:5000/api/user/add", {
        email,
        data: movieData,
      });
    } catch (err) {
      console.log(err);
    }
    return (
      <Container
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
          alt="movie"
        />
        {isHovered && (
          <div className="hover">
            <div className="image-video-container">
              <img
                src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
                alt="movie"
                onClick={() => Navigate("/player")}
              />
              <video
                src={video}
                autoPlay
                loop
                muted
                onClick={() => Navigate("/player")}
              />
            </div>
            <div className="into-container flex column">
              <h3 className="name" onClick={() => Navigate("/player")}>
                {movieData.name}
              </h3>
              <div className="icons flex j-between">
                <div className="controls flex">
                  <IoPlayCircleSharp
                    title="play"
                    onClick={() => Navigate("/player")}
                  />
                  <RiThumbUpFill title="Like" />
                  <RiThumbDownFill title="Dislike" />
                  {isLiked ? (
                    <BsCheck title="Remove from List" />
                  ) : (
                    <AiOutlinePlus title="Add to My List" onClick={addToList} />
                  )}
                </div>
                <div className="info">
                  <BiChevronDown title="More Info" />
                </div>
                <div className="genres flex">
                  <ul className="flex">
                    {movieData.genres.map((genre) => (
                      <li key={genre}>{genre}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    );
  };
}

const Container = styled.div`
  max-width: 230 px;
  width: 230px;
  height: 100%;
  cursor: pointer;
  position: relative;
  img {
    border-radius: 0.2rem;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  .hover {
    z-index: 80;
    height: max-content;
    width: 20rem;
    position: absolute;
    top: -18vh;
    left: 0;
    border-radius: 0.3rem;
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
    background-color: #181818;
    transition: 0.3s ease-in-out;
    .image-video-container {
      position: relative;
      height: 140px;
      img {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 4;
        position: absolute;
      }
      video {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 5;
        position: absolute;
      }
    }
    .info-container {
      padding: 1rem;
      gap: 0.5rem;
    }
    .icons {
      .controls {
        display: flex;
        gap: 1rem;
      }
      svg {
        font-size: 2rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: #b8b8b8;
        }
      }
    }
    .genres {
      ul {
        gap: 1rem;
        li {
          padding-right: 0.7rem;
          &:first-of-type {
            list-style-type: none;
          }
        }
      }
    }
  }
`;
