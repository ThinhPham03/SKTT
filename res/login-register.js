function kiemtra()  {
    var temp = localStorage.getItem("Login");
    var temp1 = localStorage.getItem("TongSoBaiTest");
    var temp2 = localStorage.getItem("Admin");
    var temp3 = localStorage.getItem("userlist");    
    var temp4 = localStorage.getItem("bacsilist");

    if (temp == null)   {
        var empty = {
            "isLogin": 0,
            "tendangnhap": "",
        }
        let json = JSON.stringify(empty);
        localStorage.setItem("Login", json);
    }
    if (temp2 == null)   {
        var admin = {
            "isLogin": 0,
            "tendangnhap": "admin",
            "matkhau": "admin",
        }
        var json = JSON.stringify(admin);
        localStorage.setItem("Admin", json);
    }
    if(temp1 == "0"|| temp1 == null) {
        localStorage.setItem("TongSoBaiTest", 0);
        var examlist = new Array();
        let json = JSON.stringify(examlist);
        localStorage.setItem("examlist",json);
    }

    if(temp3 != null) {
        var userlist = JSON.parse(temp3);
        if(userlist.length == 0){
            var new_userlist = new Array();
            let json = JSON.stringify(new_userlist);
            localStorage.setItem("userlist",json);
        }
    } else {
        var userlist = new Array();
        let json = JSON.stringify(userlist);
        localStorage.setItem("userlist",json);
    }

    if(temp4 != null) {
        var bacsilist = JSON.parse(temp4);
        if(bacsilist.length == 0){
            var new_bacsilist = new Array();
            let json = JSON.stringify(new_bacsilist);
            localStorage.setItem("bacsilist",json);
        }
    } else {
        var bacsilist = new Array();
        let json = JSON.stringify(bacsilist);
        localStorage.setItem("bacsilist",json);
    }
}

function checkAdminPanel()  {
    if(window.location.pathname == "/res/profile.html") {
        var temp = localStorage.getItem("Admin");
        var admin = JSON.parse(temp);
        var Loai_Account = localStorage.getItem("Loai-Profile");
        if( temp != null && admin.isLogin == 1) {
                document.getElementById("user-panel").style.display = "none";
                document.getElementById("bacsi-panel").style.display = "none";
                document.getElementById("admin-panel").style.display = "block";
        } else{ 
            if( Loai_Account == "BacSi" ) {
                document.getElementById("user-panel").style.display = "none";
                document.getElementById("bacsi-panel").style.display = "block";
                document.getElementById("admin-panel").style.display = "none";
            } else{
                document.getElementById("user-panel").style.display = "block";
                document.getElementById("bacsi-panel").style.display = "none";
                document.getElementById("admin-panel").style.display = "none";
            }
        }
    }
}

window.onload = function checkLogin() {
    kiemtra();
    checkAdminPanel()
    var temp = localStorage.getItem("Login");
    var temp1 = JSON.parse(temp);
    if(temp1.isLogin != 0) {
        document.getElementById("profile-button").style.display = "block";
        document.getElementById("login-button").style.display = "none";
        document.getElementById("logout-button").style.display = "block";
    } else {
        document.getElementById("profile-button").style.display = "none";
        document.getElementById("logout-button").style.display = "none";
        document.getElementById("login-button").style.display = "block";
    }
}