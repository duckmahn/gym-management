const ButtonGoogle = ({ label }) => {
    return (
        <button
            style={{
                padding: '10px 20px',
                backgroundColor: 'rgb(202, 206, 206)', // Màu nền
                color: 'black', // Màu chữ
                border: 'none',
                width: '400px' ,
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px',
            }}
        >
            {label}
        </button>
    );
};

export default ButtonGoogle;