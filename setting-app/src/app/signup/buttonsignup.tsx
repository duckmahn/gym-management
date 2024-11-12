const ButtonLogin = ({ label }) => {
    return (
        <button
            style={{
                padding: '10px 20px',
                backgroundColor: 'red', // Màu nền
                color: '#fff', // Màu chữ
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

export default ButtonLogin;