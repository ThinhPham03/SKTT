function check(socauhoi) {
    var socautraloi = 0;
    var cauhoi;
    for(i = 1; i<= socauhoi; i++){
        cauhoi = "diemcau";
        cauhoi = cauhoi+i;
        var checkbox = document.getElementsByName(cauhoi);
        for (j = 0; j < 4; j++){
            if (checkbox[j].checked === true){
                socautraloi++;
                break;
            }
            else{
                continue;
            }
        }
    }
    if(socautraloi != socauhoi)    {
        document.getElementById("socautraloi").innerHTML = socautraloi;
        document.getElementById("socauhoi").innerHTML = socauhoi;
        document.getElementById("error").style.display = "block";
    }else{
        return true;
    }
}

function tinhDiem(socauhoi) {
    var diemChuan = new Number(0);
    var cauhoi;
    for(i = 1; i<= socauhoi; i++){
        cauhoi = "diemcau";
        cauhoi = cauhoi+i;
        var checkbox = document.getElementsByName(cauhoi);
        for (j = 0; j < 4; j++){
            if (checkbox[j].checked === true){
                diemChuan += Number(checkbox[j].value);
                break;
            }
            else{
                continue;
            }
        }
    }
    anBaiTest();
    document.getElementById("result").style.display = "block";
    return diemChuan;
};

function tinhDiem_DASS(socauhoi) {
    var diemStress = new Number(0);
    var diemLoAu = new Number(0);
    var diemTramCam = new Number(0);
    var cauhoi;
    for(i = 1; i<= socauhoi; i++){
        cauhoi = "diemcau";
        cauhoi = cauhoi+i;
        var checkbox = document.getElementsByName(cauhoi);
        for (j = 0; j < 4; j++){
            if (checkbox[j].checked === true){
                var temp = checkbox[j].id.split('');
                switch(temp[0]) {
                    case "D":
                        diemTramCam += Number(checkbox[j].value); 
                    break;

                    case "A":
                        diemLoAu += Number(checkbox[j].value);                       
                    break;
            
                    case "S":
                        diemStress += Number(checkbox[j].value); 
                    break;
                }
            }
            else{
                continue;
            }
        }
    }
    anBaiTest();
    document.getElementById("result").style.display = "block";
    return [diemTramCam, diemLoAu, diemStress];
};

function ketLuan(tinhtrang, denghi) {
    document.getElementById("ID-result").innerHTML = "ID: " + fomatID(nextID());;
    document.getElementById("TinhTrang").innerHTML = tinhtrang;
    document.getElementById("DeNghi").innerHTML = denghi;
}

function hienBaiTest() {
    document.getElementById("test-form").style.display = "block";
    document.getElementById("test-info").style.display = "none";

}

function anBaiTest()    {
    document.getElementById("test-form").style.display = "none";
}

function showlogin() {
    hide_register();
    document.getElementById("login").style.display = "block";
}

function hidelogin() {
    document.getElementById("login").style.display = "none";
}

function open_register() {
    hidelogin();
    document.getElementById("register").style.display = "block";
    document.getElementById("step2").style.display = "none";
    document.getElementById("step1").style.display = "block";
    document.getElementById("register").style.height = "57%";
    document.getElementById("register").style.top = "19%";
    document.getElementById("register").style.left = "30%";
}

function hide_register() {
    document.getElementById("register").style.display = "none";
}

function nextstep() {
    document.getElementById("step1").style.display = "none";
    document.getElementById("step2").style.display = "block";
    document.getElementById("register").style.height = "36%";
    document.getElementById("register").style.top = "35%";
    document.getElementById("register").style.left = "30%";
}

function prevstep() {
    document.getElementById("step1").style.display = "block";
    document.getElementById("step2").style.display = "none";
    document.getElementById("register").style.height = "57%";
    document.getElementById("register").style.top = "19%";
    document.getElementById("register").style.left = "30%";
}

document.addEventListener("submit", function handleSubmit(event) 
{
    document.getElementById("register-form").reset();
    document.getElementById("login-form").reset();
});

function register() {
    var tendangnhap = document.getElementById("TenDangNhap-r").value;
    var matkhau = document.getElementById("MatKhau-r").value;
    var hoten = document.getElementById("HoTen").value;
    var ngaysinh = document.getElementById("NgaySinh").value;
    var gioitinh = document.getElementById("GioiTinh").value;
    var sdt = document.getElementById("SDT").value;
    var email = document.getElementById("Email").value;    

    if(dupUserID(tendangnhap)) {
        var temp = localStorage.getItem("userlist");
        var userlist = JSON.parse(temp);
        var account = {
            "tendangnhap": tendangnhap,
            "matkhau": matkhau,
            "hoten": hoten,
            "ngaysinh": ngaysinh,
            "gioitinh": gioitinh,
            "sdt": sdt,
            "email": email,   
            "sobaitest": 0,
        }
        userlist[userlist.length] = account;
        let json = JSON.stringify(userlist);
        localStorage.setItem("userlist",json);
        alert("Đăng ký thành công");
        hide_register();
    } 
    else {
        alert("Tên đăng nhập này đã được sử dụng!");
    }
}

function dupUserID(tendangnhap) {
    var data = checkAccount(tendangnhap)
    if(data == null) {
        return true;
    } else{
        return false;
    }
}

function checkAccount(tendangnhap) {
    var temp = localStorage.getItem("userlist");
    var userlist = JSON.parse(temp);
    var temp1 = localStorage.getItem("bacsilist");
    var bacsilist = JSON.parse(temp1);
    if(tendangnhap != "")    {
        for(i = 0; i < userlist.length; i++) {
            if(userlist[i].tendangnhap ==  tendangnhap)  {
                localStorage.setItem("Loai-Profile" , "User");
                return userlist[i];
            } else{
                continue;
            }
        }
        for(i = 0; i < bacsilist.length; i++) {
            if(bacsilist[i].tendangnhap ==  tendangnhap)  {
                localStorage.setItem("Loai-Profile" , "BacSi");
                return bacsilist[i];
            } else{
                continue;
            }
        }
        return null;
    }else{
        return null;
    }
}

function login() {
    var temp = localStorage.getItem("Admin");
    var admin = JSON.parse(temp);
    var tendangnhap = document.getElementById("TenDangNhap-l").value;
    var matkhau = document.getElementById("MatKhau-l").value;

    if(admin.tendangnhap == tendangnhap && admin.matkhau == matkhau) {
        alert("Bạn đã là quản trị viên");
        localStorage.removeItem("Login");
        var user = {
            "isLogin": 1,
            "tendangnhap": tendangnhap,
        }
        var json = JSON.stringify(user);
        localStorage.setItem("Login", json);

        localStorage.removeItem("Admin");
        var admin = {
            "isLogin": 1,
            "tendangnhap": "admin",
            "matkhau": matkhau,
        }
        var json = JSON.stringify(admin);
        localStorage.setItem("Admin", json);
        hidelogin();
    } else {
        var temp1 = checkAccount(tendangnhap);
        if(temp1 != null ) {
            if(temp1.matkhau == matkhau) {
                alert("Chào mừng " + temp1.hoten + " đã quay trở lại");
                localStorage.removeItem("Login");

                var temp2 = {
                    "isLogin": 1,
                    "tendangnhap": temp1.tendangnhap,
                }
                var json = JSON.stringify(temp2);
                localStorage.setItem("Login", json);
                hidelogin();
            } else{
                alert("Tên đăng nhập hoặc mật khẩu không chính xác!");
            }
        } else if(matkhau == "") {
        alert("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu!");
        } else{
        alert("Tên đăng nhập không tồn tại!")
        }
    }
}

function logout() {
    localStorage.removeItem("Login");
    var empty = {
        "isLogin": 0,
        "tendangnhap": "",
    }

    var admin = currentAdmin();
    if(admin != null) {
            localStorage.removeItem("Admin");
            var temp = {
                "isLogin": 0,
                "tendangnhap": "admin",
                "matkhau": admin.matkhau,
            }
            var new_admin = JSON.stringify(temp);
            localStorage.setItem("Admin", new_admin);
    }

    var temp1 = JSON.stringify(empty);
    localStorage.setItem("Login", temp1);
    localStorage.removeItem("Loai-Profile");
    location.reload();
}

function updateProfile(){
    if (currentProfile() != null) {
        if( localStorage.getItem("Loai-Profile")  == "User" ){
            let temp = localStorage.getItem("userlist");
            let userlist = JSON.parse(temp);
            profile = userlist[currentProfile()];
            document.getElementById("info-Profile").style.fontSize = "25px"
            document.getElementById("info-Profile").style.margin = "0px"
            document.getElementById("profile-tendangnhap").innerHTML = profile.tendangnhap;
            document.getElementById("profile-hoten").innerHTML = profile.hoten;
            document.getElementById("profile-ngaysinh").innerHTML = profile.ngaysinh;
            document.getElementById("profile-gioitinh").innerHTML =profile.gioitinh;
            document.getElementById("profile-email").innerHTML = profile.email;
            document.getElementById("profile-sdt").innerHTML = profile.sdt;
        } else{
            let temp = localStorage.getItem("bacsilist");
            let bacsilist = JSON.parse(temp);
            profile = bacsilist[currentProfile()];
            document.getElementById("info-Profile").innerHTML = `
                <div class="info">
                    <p class="p1">Tên đăng nhập: 
                        <p id="bacsi-tendangnhap"></p>
                    </p>
                </div>
                <div class="info">
                    <p class="p1">Họ và tên: 
                        <p id="bacsi-hoten"></p>
                    </p>
                </div>
                <div class="info">
                    <p class="p1">Mã số nhân viên: 
                        <p id="bacsi-manv"></p>
                    </p>
                </div>
                <div class="info">
                    <p class="p1">Chức vụ: 
                        <p id="bacsi-chucvu"></p>
                    </p>
                </div>
                <div class="info">
                    <p class="p1">Số điện thoại: 
                        <p id="bacsi-sdt"></p>
                    </p>
                </div>
                <div id="form-button">
                    <input type="button" id="chinhsuProfile" onclick="open_editProfile()" value="Chỉnh sửa thông tin cá nhân">
                    <input type="button" id="deleteProfile" onclick="createConfirmForm()" value="Xóa tài khoản">
                </div>
            `;
            document.getElementById("info-Profile").style.fontSize = "25px"
            document.getElementById("info-Profile").style.margin = "0px"
            document.getElementById("bacsi-tendangnhap").innerHTML = profile.tendangnhap;
            document.getElementById("bacsi-hoten").innerHTML = profile.hoten;
            document.getElementById("bacsi-manv").innerHTML = profile.manv;
            document.getElementById("bacsi-chucvu").innerHTML =profile.chucvu;
            document.getElementById("bacsi-sdt").innerHTML = profile.sdt;
        }

        return true;
    }else {
        var admin = currentAdmin();
        if(admin != null) {
            document.getElementById("info-Profile").innerHTML = `
                <div style="font-size: 40px; margin: 131px 0px;">Bạn đang ở chế độ quản trị viên</div>
                <input type="button" id="chinhsuAdmin" onclick="show_editAdmin()" value="Chỉnh sửa mật khẩu">     
            `
            return true;
        }else{
            return false;
        }
    }
}

function showInfo() {
    if (updateProfile()) {
        document.getElementById("info-Profile").style.display = "block";
        document.getElementById("showInfo").style.display = "none";
        document.getElementById("hideInfo").style.display = "block";
        document.getElementById("avatar").style.marginLeft = "0%";
    }
}

function hideInfo() {
    updateProfile();
    document.getElementById("info-Profile").style.display = "none";
    document.getElementById("showInfo").style.display = "block";
    document.getElementById("hideInfo").style.display = "none";
    document.getElementById("avatar").style.marginLeft = "35%";
}

function currentProfile()   {
    var temp = localStorage.getItem("Login");
    var temp1 = JSON.parse(temp);
    if(temp1.isLogin == 1)  {
        if( localStorage.getItem("Loai-Profile")  == "User" ){
            var temp3 = localStorage.getItem("userlist");
            if( temp3 != null) {
                var userlist = JSON.parse(temp3);
                for(i = 0; i < userlist.length; i++) {
                    if(userlist[i].tendangnhap ==  temp1.tendangnhap)  {
                        return i;
                    } else{
                        continue;
                    }
                }
                return null;
            } else{
                return null;
            }
        } else{
            var temp2 = localStorage.getItem("bacsilist");
            if( temp2 != null) {
                var bacsilist = JSON.parse(temp2);
                for(i = 0; i < bacsilist.length; i++) {
                    if(bacsilist[i].tendangnhap ==  temp1.tendangnhap)  {
                        return i;
                    } else{
                        continue;
                    }
                }
                return null;
            } else{
                return null;
            }
        }
    } else {
        return null;
    }
}

function currentAdmin()   {
    var temp = localStorage.getItem("Admin");
    if(temp != null) {
        var admin = JSON.parse(temp);
        if(admin.isLogin == 1)  {
            return admin;
        } else {
            return null;
        }
    } else{
        return null;
    }
}

function fomatID(ID)  {
    if (ID < 100 && ID > 9)    {
        return "0" + ID;
    } else{
        return "00" + ID;
    }
}

function nextID()   {
    var TongSoBaiTest = Number(localStorage.getItem("TongSoBaiTest"));
    var i = Number(0);
    for(i; i <= TongSoBaiTest; i++)
        if(i == TongSoBaiTest)  {
            return i+1;
        }
    
}

function updateSoBaiTest()  {
    var temp = localStorage.getItem("userlist");
    var userlist = JSON.parse(temp);
    var temp1 = localStorage.getItem("bacsilist");
    if(currentProfile() != null) {
        var profile = userlist[currentProfile()];
        var sobaitest = Number(profile.sobaitest);
        sobaitest++;
        var account = {
            "tendangnhap": profile.tendangnhap,
            "matkhau": profile.matkhau,
            "hoten": profile.hoten,
            "ngaysinh": profile.ngaysinh,
            "gioitinh": profile.gioitinh,
            "sdt": profile.sdt,
            "email": profile.email,   
            "sobaitest": sobaitest,
        }
        userlist[currentProfile()] = account;
        var json = JSON.stringify(userlist);
        localStorage.setItem("userlist",json);
    }
}

function fomatDate(date) {
    return date.toString().padStart(2, '0');
}

function currentDate()  {
    var today = new Date();
    var date = today.getFullYear()+'-'+fomatDate(today.getMonth() + 1) +'-'+ fomatDate(today.getDate());
    return date;
}

function updateLichSuTong(TinhTrang, DeNghi) {
    var ID = fomatID(nextID());
    var BaiTest = document.getElementById("BaiTest").value;
    var temp1 = localStorage.getItem("TongSoBaiTest");
    var admin = currentAdmin();
    if(admin != null) {
        var exam = {
            "ID": ID,
            "ChiTiet": {
                "BaiTest": BaiTest,
                "NguoiThucHien": "Quản trị viên",
                "ThoiGian": currentDate(),
                "TinhTrang": TinhTrang,
                "DeNghi": DeNghi,
            }
        }
    }else if(currentProfile() != null) {
        var profile;
        if( localStorage.getItem("Loai-Profile")  == "User" ){
            let temp = localStorage.getItem("userlist");
            let userlist = JSON.parse(temp);
            profile = userlist[currentProfile()];
        } else{
            let temp = localStorage.getItem("bacsilist");
            let bacsilist = JSON.parse(temp);
            profile = bacsilist[currentProfile()];
        }
        var exam = {
            "ID": ID,
            "ChiTiet": {
                "BaiTest": BaiTest,
                "NguoiThucHien": profile.tendangnhap,
                "ThoiGian": currentDate(),
                "TinhTrang": TinhTrang,
                "DeNghi": DeNghi,
            }
        }
    }else{
        var exam = {
            "ID": ID,
            "ChiTiet": {
                "BaiTest": BaiTest,
                "NguoiThucHien": "Visitor",
                "ThoiGian": currentDate(),
                "TinhTrang": TinhTrang,
                "DeNghi": DeNghi,
            }
        }
    }

    var temp = localStorage.getItem("examlist");
    var examlist = JSON.parse(temp);
    examlist[temp1] = exam;
    var json = JSON.stringify(examlist);
    localStorage.setItem("examlist",json);
}

function updateTongSoBaiTest()  {
    var current_SoBaiTest = Number(localStorage.getItem("TongSoBaiTest"));
    var new_SoBaiTest = current_SoBaiTest; new_SoBaiTest++;
    localStorage.setItem("TongSoBaiTest",new_SoBaiTest);
}

function test() {
    console.log('Aasdasdasdsa');
}
