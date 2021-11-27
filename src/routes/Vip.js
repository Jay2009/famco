import FamcoVip from "components/Famcovip";
import {v4 as uuidv4} from "uuid";
import { dbService, storageService } from "fbase";
import { addDoc,doc, collection,getDoc, getDocs, query, onSnapshot, orderBy, where, } from "@firebase/firestore";
import {ref, uploadString, getDownloadURL} from "@firebase/storage";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";


const Home = ({userObj}) => {
    const [NewFamcoMsg, setNewFamcoMsg] = useState("");
    const [NewFamcoMsges, setNewFamcoMsges] = useState([]);
    const [attachment, setAttachment] = useState("");
    const [isAttachmentExist, SetIsAttachmentExist] = useState(false);
    const [isUserInfoExist, SetIsUserInfoExist] = useState(false);
    const [isUserVip, SetIsUserVip] = useState(false);
    const [isLoading, setIsLoading] = useState(false); 

    const date = new Date();
    const year = String(date.getFullYear());
    const month = String(date.getMonth()+1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    //const sec = String(date.getSeconds()).padStart(2,"0");

    const getNewFamcoMsges = async() => {
    const DbNewFamcoMsges = query(collection(dbService,"NewFamcoVip"));
    const querySnapshot = await getDocs(DbNewFamcoMsges);
    querySnapshot.forEach((doc) => {
        const newFamcoMsgObj = {
            ...doc.data(),
            id: doc.id,
                
        }
        setNewFamcoMsges((prev) => [newFamcoMsgObj, ...prev]);
    });
    };
    
    

    const checkVip = async() =>{
        
        const q = query(
            collection(dbService, "UserInfo"),
            where("creatorId", "==", userObj.uid),
            );
            const getDocuments = await getDocs(q);
            
            getDocuments.forEach(async(document) => {
                const docRef = doc(dbService, "UserInfo", `${document.id}`);
                const getDocument = await getDoc(docRef);
                    if(getDocument.data().vip === "jandc914"){
                        SetIsUserVip(true);
                    }else {
                        
                    }
            });
    }


    const checkUserInfo = async() =>{
        checkVip();
        const q = query(
            collection(dbService, "UserInfo"),
            where("creatorId", "==", userObj.uid)
            );
            const getDocument = await getDocs(q);
            getDocument.forEach(() => {
                SetIsUserInfoExist(true);
            });
    }

    

    useEffect (() => { 
        
        checkUserInfo();
        const q = query(
            collection(dbService, "NewFamcoVip"),
            orderBy("createdAt", "desc")
            );
            onSnapshot(q, (snapshot) => {
            const famcoArr = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            }));
            setNewFamcoMsges(famcoArr);
            });
            
            }, []);

    const onSubmit = async(event) => {       
        setIsLoading(true);
        event.preventDefault();
        let attachmentUrl = "";
        if(attachment !== ""){
        const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
        // 여기에 업로드 어태치먼트가 이상해서그랭
        const uploadFile = await uploadString(attachmentRef, attachment, "data_url");
        attachmentUrl = await getDownloadURL(uploadFile.ref);
        
        }
        const newfamcoPosting = {
            text: NewFamcoMsg,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            name: userObj.displayName,
            uploadedDate:  year +"/"+ month +"/"+ day +" At "+ hours +" : "+ minutes,
            likes: 0,
            likedName: "",
            commentsNumber:0,
            comments:[],
            commentTime:[],
            attachmentUrl
            
        };
        try {
            await addDoc(collection(dbService, "NewFamcoVip"), newfamcoPosting);
            setIsLoading(false);
            } catch (error) {
            }
            
            setNewFamcoMsg("");
            setAttachment("");
            SetIsAttachmentExist(false);
    };
    const onChange = ({ target: { value } }) => {
        setNewFamcoMsg(value);
        };
    
    const onFileChange = (event) => {

        const {
            target: {files},
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: {result},
                } = finishedEvent;
            setAttachment(result);
        };
        SetIsAttachmentExist(true);
        reader.readAsDataURL(theFile);
        
    };


    const onClearAttachment = (evnet) => {
        SetIsAttachmentExist(false);
        setAttachment("");
    }
    
    return (
        <>
    {isUserVip ? (    
    <div className="container">

        <span className="vip__span">Welcome to VIP room!</span>
        
        <form onSubmit ={onSubmit} className="famcoMsgForm">
        <div className="famcoMsgInput__container">
            {isUserInfoExist ? ( 
                <>
            <textarea
                className="famcoMsgInput__input"
                value={NewFamcoMsg} 
                onChange= {onChange} 
                type="text" 
                placeholder=" What's on your mind?" 
                maxLength="120" 
                required
            />

            {isLoading ? ( 
                <div className="loading"></div>
            ) : (
                <input 
                    type="submit" 
                    value="Post" 
                    className="famcoMsgInput__post"
                />
            )}
            {isAttachmentExist ? (
                <></>
            ) : (
                <>
                <label htmlFor="attach-file" className="famcoMsgInput__label">
                <FontAwesomeIcon icon={faPlus} />
                    <span> Add photo</span>  
                </label>
                <input
                className="famcoMsgInput__labelChild"
                id="attach-file"
                type="file"
                accept="image/*"
                onChange={onFileChange}
                />
                </>
            )}

            </>
            ):(
                <div className="noUserName">Add infomation on your profile to start</div>
            )}
            {attachment && (
            <div className="famcoMsgForm__attachment">
                <img 
                src={attachment}
                />
            <div className="famcoMsgForm__clear" onClick={onClearAttachment}>
                <FontAwesomeIcon icon={faTimes} />
            </div>
            </div>
            )}
            </div>
            
        </form>
        <div  style={{ marginTop: 30 }}>     
            {NewFamcoMsges.map((NewFamcoMsg) => (
                <FamcoVip 
                key={NewFamcoMsg.id} 
                FamcoVipObj={NewFamcoMsg} 
                isOwner={NewFamcoMsg.creatorId === userObj.uid}
                userObj={userObj}
                />
            ))}
        </div>
        
    </div>
    ) : ( <span className="vip__span"> You need the access for VIP room.</span> )}
    </>
    );
    
};
export default Home;