import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function SimpleMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handle2D = () => {
        setAnchorEl(null);
        props.switch2D();
    };
    const handle3D = () => {
        setAnchorEl(null);
        props.switch3D();
    };
    const handleVR = () => {
        setAnchorEl(null);
        props.switchVR();
    };
    const handleClose = () => {
        setAnchorEl(null);
    }

    return (
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} color='inherit'>
                Change Graph View
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handle2D}>2D</MenuItem>
                <MenuItem onClick={handle3D}>3D</MenuItem>
                <MenuItem onClick={handleVR}>VR</MenuItem>
            </Menu>
        </div>
    );
}