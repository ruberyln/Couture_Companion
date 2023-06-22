import React, { useState , useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/system";

const AvatarButton = styled(Button)({
    position: "relative",
});

const StyledAvatar = styled(Avatar)({
    width: 56,
    height: 56,
});

const AddIconStyled = styled(AddIcon)({
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#fff",
    color: "gray",
});

function AvatarUpload({src, onChange}) {
    const [avatar, setAvatar] = useState("/static/images/avatar/1.jpg");

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setAvatar(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            setAvatar("");
            onChange("");
        }
    };

 useEffect(() => {
        setAvatar(src);
    }, [src]);

    return (
        <div>
            <input
                accept="image/*"
                style={{ display: "none" }}
                id="raised-button-file"
                type="file"
                onChange={handleImageUpload}
            />
            <label htmlFor="raised-button-file">
                <AvatarButton component="span">
                    <StyledAvatar alt="Remy Sharp" src={avatar} />
                    <AddIconStyled />
                </AvatarButton>
            </label>
        </div>
    );
}

export default AvatarUpload;
