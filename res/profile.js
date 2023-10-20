var anchor = document.getElementById("admin-panel");
var button = anchor.getElementsByClassName("selection");
for (var i = 0; i < button.length; i++) {
    button[i].addEventListener("click", function() {
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";
    });
}

function LichSuList(){
    document.getElementById("list").innerHTML = "";

    var profile;
    if(currentProfile() != null) {
        if( localStorage.getItem("Loai-Profile")  == "User" ){
            let temp = localStorage.getItem("userlist");
            let userlist = JSON.parse(temp);
            profile = userlist[currentProfile()];
        } else{
            let temp = localStorage.getItem("bacsilist");
            let bacsilist = JSON.parse(temp);
            profile = bacsilist[currentProfile()];
        }
    }

    var admin = currentAdmin();
    var TongSoBaiTest = parseInt(localStorage.getItem("TongSoBaiTest"));
    var temp = localStorage.getItem("examlist");
    var examlist = JSON.parse(temp);

    if(TongSoBaiTest == 0) {
        document.getElementById("list").innerHTML = `
            <div class="exam" style="font-size: 30px; text-align: center;">Hiện không có bài đánh giá nào trong cơ sở dữ liệu</div> 
        `;
    } else{
        var temp = 0;
        for(i = 0; i < TongSoBaiTest; i++) {
            if (admin != null && typeof document.getElementsByClassName("ID")[TongSoBaiTest-1] == "undefined") {
                createExamForm();
                var ChiTiet = examlist[i].ChiTiet; 
                document.getElementsByClassName("ID")[temp].innerHTML = examlist[i].ID;
                document.getElementsByClassName("BaiTest")[temp].innerHTML = "Thang đánh giá " + ChiTiet.BaiTest;
                document.getElementsByClassName("ThoiGian")[temp].innerHTML = ChiTiet.ThoiGian;
                document.getElementsByClassName("NguoiThucHien")[temp].innerHTML = "Người thực hiện: " + ChiTiet.NguoiThucHien;
                document.getElementsByClassName("TinhTrang")[temp].innerHTML = ChiTiet.TinhTrang;
                document.getElementsByClassName("DeNghi")[temp].innerHTML = ChiTiet.DeNghi;
                temp++; 
            } else if(examlist[i].ChiTiet.NguoiThucHien == profile.tendangnhap && typeof document.getElementsByClassName("ID")[profile.sobaitest] == "undefined") {
                createExamForm();
                var ChiTiet = examlist[i].ChiTiet; 
                document.getElementsByClassName("ID")[temp].innerHTML = examlist[i].ID;
                document.getElementsByClassName("BaiTest")[temp].innerHTML = "Thang đánh giá " + ChiTiet.BaiTest;
                document.getElementsByClassName("ThoiGian")[temp].innerHTML = ChiTiet.ThoiGian;
                document.getElementsByClassName("TinhTrang")[temp].innerHTML = ChiTiet.TinhTrang;
                document.getElementsByClassName("DeNghi")[temp].innerHTML = ChiTiet.DeNghi;
                temp++;
            }
    
        }
    }
}

function createExamForm() {
    var exam = document.createElement("div");
    exam.className = "exam";
    var exam_header = document.createElement("div");
    exam_header.className = "exam-header";
    var p_ID = document.createElement("p");
    p_ID.className = "ID";
    var p_BaiTest = document.createElement("p");
    p_BaiTest.className = "BaiTest";

    var p_NguoiThucHien = document.createElement("p");
    p_NguoiThucHien.className = "NguoiThucHien";

    var p_ThoiGian = document.createElement("p");
    p_ThoiGian.className = "ThoiGian";

    var p_TinhTrang = document.createElement("p");
    p_TinhTrang.className = "TinhTrang";

    var p_DeNghi = document.createElement("p");
    p_DeNghi.className = "DeNghi";

    exam.appendChild(exam_header);
    exam.appendChild(p_ThoiGian);
    exam.appendChild(p_NguoiThucHien);
    exam.appendChild(p_TinhTrang);
    exam.appendChild(p_DeNghi);

    exam_header.appendChild(p_BaiTest);
    exam_header.insertBefore(p_ID,p_BaiTest);
    const list = document.getElementById("list");
    list.appendChild(exam);
}

function open_editProfile() {
    var admin = currentAdmin();
    var profile;
    if(admin != null) {
        if(admin.isLogin == 1) {
            var index = localStorage.getItem("Index-Profile");
            if(localStorage.getItem("Loai-Profile") == "User") {
                let temp = localStorage.getItem("userlist");
                var userlist = JSON.parse(temp);
                profile = userlist[index];
                document.getElementById("info-Profile").style.fontSize = "25px"
                document.getElementById("info-Profile").style.margin = "0px"
                document.getElementById("new-HoTen").value = profile.hoten;
                document.getElementById("new-NgaySinh").value = profile.ngaysinh;
                document.getElementById("new-GioiTinh").value = profile.gioitinh;
                document.getElementById("new-SDT").value = profile.sdt;
                document.getElementById("new-Email").value = profile.email;
                document.getElementById("display-TenDangNhap").innerHTML = profile.tendangnhap;
                document.getElementById("current-TenDangNhap").value = profile.tendangnhap;
                document.getElementById("new-MatKhau").value = profile.matkhau;

                document.getElementById("editProfile").style.display = "block";
                document.getElementById("edit-step2").style.display = "none";
                document.getElementById("edit-step1").style.display = "block";
                document.getElementById("editProfile").style.height = "58%";
                document.getElementById("editProfile").style.top = "19%";
                document.getElementById("editProfile").style.left = "30%";
            } else{
                let temp = localStorage.getItem("bacsilist");
                var bacsilist = JSON.parse(temp);
                profile = bacsilist[index];
                document.getElementById("info-Profile").style.fontSize = "25px"
                document.getElementById("info-Profile").style.margin = "0px"
                document.getElementById("new-HoTenbs").value = profile.hoten;
                document.getElementById("new-MaNV").value = profile.manv;
                document.getElementById("new-ChucVu").value = profile.chucvu;
                document.getElementById("new-SDTbs").value = profile.sdt;
                document.getElementById("display-TenDangNhapBS").innerHTML = profile.tendangnhap;
                document.getElementById("current-TenDangNhapBS").value = profile.tendangnhap;
                document.getElementById("new-MatKhauBS").value = profile.matkhau;

                document.getElementById("editBacSi").style.display = "block";
                document.getElementById("editBS-step2").style.display = "none";
                document.getElementById("editBS-step1").style.display = "block";
                document.getElementById("editBacSi").style.height = "50%";
                document.getElementById("editBacSi").style.top = "25%";
                document.getElementById("editBacSi").style.left = "30%";
            }
        }
    }else if(currentProfile() != null) {
        if(localStorage.getItem("Loai-Profile") == "User") {
            let temp = localStorage.getItem("userlist");
            var userlist = JSON.parse(temp);
            profile = userlist[currentProfile()];
            document.getElementById("info-Profile").style.fontSize = "25px"
            document.getElementById("info-Profile").style.margin = "0px"
            document.getElementById("new-HoTen").value = profile.hoten;
            document.getElementById("new-NgaySinh").value = profile.ngaysinh;
            document.getElementById("new-GioiTinh").value = profile.gioitinh;
            document.getElementById("new-SDT").value = profile.sdt;
            document.getElementById("new-Email").value = profile.email;
            document.getElementById("display-TenDangNhap").innerHTML = profile.tendangnhap;
            document.getElementById("current-TenDangNhap").value = profile.tendangnhap;
            document.getElementById("new-MatKhau").value = profile.matkhau;

            document.getElementById("editProfile").style.display = "block";
            document.getElementById("edit-step2").style.display = "none";
            document.getElementById("edit-step1").style.display = "block";
            document.getElementById("editProfile").style.height = "58%";
            document.getElementById("editProfile").style.top = "19%";
            document.getElementById("editProfile").style.left = "30%";
        } else{
            let temp = localStorage.getItem("bacsilist");
            var bacsilist = JSON.parse(temp);            
            profile = bacsilist[currentProfile()];
            document.getElementById("info-Profile").style.fontSize = "25px"
            document.getElementById("info-Profile").style.margin = "0px"
            document.getElementById("new-HoTenbs").value = profile.hoten;
            document.getElementById("new-MaNV").value = profile.manv;
            document.getElementById("new-ChucVu").value = profile.chucvu;
            document.getElementById("new-SDTbs").value = profile.sdt;
            document.getElementById("display-TenDangNhapBS").innerHTML = profile.tendangnhap;
            document.getElementById("current-TenDangNhapBS").value = profile.tendangnhap;
            document.getElementById("new-MatKhauBS").value = profile.matkhau;

            document.getElementById("editBacSi").style.display = "block";
            document.getElementById("editBS-step2").style.display = "none";
            document.getElementById("editBS-step1").style.display = "block";
            document.getElementById("editBacSi").style.height = "50%";
            document.getElementById("editBacSi").style.top = "25%";
            document.getElementById("editBacSi").style.left = "30%";
        }
    }
}

function hide_editProfile() {
    if(localStorage.getItem("Loai-Profile") == "User") {
        document.getElementById("editProfile").style.display = "none";
    } else{
        document.getElementById("editBacSi").style.display = "none";
    }
}

function nextstep_editProfile() {
    if(localStorage.getItem("Loai-Profile") == "User") {
        document.getElementById("edit-step1").style.display = "none";
        document.getElementById("edit-step2").style.display = "block";
        document.getElementById("editProfile").style.height = "31%";
        document.getElementById("editProfile").style.top = "35%";
        document.getElementById("editProfile").style.left = "30%";
    } else{
        document.getElementById("editBS-step1").style.display = "none";
        document.getElementById("editBS-step2").style.display = "block";
        document.getElementById("editBacSi").style.height = "31%";
        document.getElementById("editBacSi").style.top = "35%";
        document.getElementById("editBacSi").style.left = "30%";
    }
}

function prevstep_editProfile() {
    if(localStorage.getItem("Loai-Profile") == "User") {
        document.getElementById("edit-step1").style.display = "block";
        document.getElementById("edit-step2").style.display = "none";
        document.getElementById("editProfile").style.height = "58%";
        document.getElementById("editProfile").style.top = "19%";
        document.getElementById("editProfile").style.left = "30%";
    } else{
        document.getElementById("editBS-step1").style.display = "block";
        document.getElementById("editBS-step2").style.display = "none";
        document.getElementById("editBacSi").style.height = "50%";
        document.getElementById("editBacSi").style.top = "19%";
        document.getElementById("editBacSi").style.left = "30%";
    }
}

function editProfile() {
    var temp = localStorage.getItem("userlist");
    var userlist = JSON.parse(temp);
    var temp1 = localStorage.getItem("bacsilist");
    var bacsilist = JSON.parse(temp1);
    if(localStorage.getItem("Loai-Profile") == "User") {
        var tendangnhap = document.getElementById("current-TenDangNhap").value;
        var matkhau = document.getElementById("new-MatKhau").value;
        var hoten = document.getElementById("new-HoTen").value;
        var ngaysinh = document.getElementById("new-NgaySinh").value;
        var gioitinh = document.getElementById("new-GioiTinh").value;
        var sdt = document.getElementById("new-SDT").value;
        var email = document.getElementById("new-Email").value;
    } else{
        var temp = localStorage.getItem("bacsilist");
        var bacsilist = JSON.parse(temp);
        var tendangnhap = document.getElementById("current-TenDangNhapBS").value;
        var matkhau = document.getElementById("new-MatKhauBS").value;
        var hoten = document.getElementById("new-HoTenbs").value;
        var manv = document.getElementById("new-MaNV").value;
        var sdt = document.getElementById("new-SDTbs").value;
        var chucvu = document.getElementById("new-ChucVu").value;
    }


    var admin = currentAdmin();
    var index;
    var profile;
    if(admin != null) {
        index = localStorage.getItem("Index-Profile");
        if(localStorage.getItem("Loai-Profile") == "User") {
            profile = userlist[index];
        } else{
            profile = bacsilist[index];
        }
    } else if (currentProfile() != null){
        index = currentProfile();
        if(localStorage.getItem("Loai-Profile") == "User") {
            profile = userlist[index];
        } else{
            profile = bacsilist[index];

        }
    }

    if(localStorage.getItem("Loai-Profile") == "User") {
        var sobaitest = profile.sobaitest;
        var account = {
            "tendangnhap": tendangnhap,
            "matkhau": matkhau,
            "hoten": hoten,
            "ngaysinh": ngaysinh,
            "gioitinh": gioitinh,
            "sdt": sdt,
            "email": email,   
            "sobaitest": sobaitest,
        };
        
        userlist[index] = account;
        var json = JSON.stringify(userlist);
        localStorage.setItem("userlist",json);
    } else{
        var temp = localStorage.getItem("bacsilist");
        var bacsilist = JSON.parse(temp);
        var account = {
            "tendangnhap": tendangnhap,
            "matkhau": matkhau,
            "hoten": hoten,
            "manv": manv,
            "sdt": sdt,
            "chucvu": chucvu,
        }
        bacsilist[index] = account;
        let json = JSON.stringify(bacsilist);
        localStorage.setItem("bacsilist",json);
    }

    alert("Chỉnh sửa thành công");
    // localStorage.removeItem("Index-Profile");
    hide_editProfile();
    hideInfo();
}

function show_editAdmin() {
    var temp = localStorage.getItem("Admin");
    var admin = JSON.parse(temp);
    document.getElementById("editAdmin").style.display = "block";
    document.getElementById("new-admin_pass").value = admin.matkhau;
}

function hide_editAdmin() {
    document.getElementById("editAdmin").style.display = "none";
}

function editAdmin() {
    var matkhau = document.getElementById("new-admin_pass").value;
    localStorage.removeItem("Admin");

    var admin = {
        "isLogin": 1,
        "tendangnhap": "admin",
        "matkhau": matkhau,
    }
    var json1 = JSON.stringify(admin);
    localStorage.setItem("Admin", json1);
    hide_editProfile();
    alert("Chỉnh sửa thành công");
}

function AccountList() {    
    var temp = localStorage.getItem("userlist");
    var userlist = JSON.parse(temp);
    var temp5 = localStorage.getItem("bacsilist");
    var bacsilist = JSON.parse(temp5);
    var admin = currentAdmin();
    
    if((userlist.length == 0 || temp == null) && (bacsilist.length == 0 || temp5 == null)) {
        document.getElementById("list").innerHTML = ` <div class="account" style="font-size: 30px; text-align: center;">Hiện không có tài khoản nào trong cơ sở dữ liệu</div> `;
    } else if(admin != null) {
        if(userlist.length != 0) {
            for(i = 0; i < userlist.length; i++) {
                if (typeof document.getElementsByClassName("ID")[userlist.length-1] == "undefined") {
                    createUserForm(i);
                    document.getElementsByClassName("userid")[i].innerHTML = "UserID: " + userlist[i].tendangnhap;
                    document.getElementsByClassName("hoten")[i].innerHTML = "Họ và Tên: " + userlist[i].hoten;
                    document.getElementsByClassName("gioitinh")[i].innerHTML = "Giới tính: " + userlist[i].gioitinh;
                    document.getElementsByClassName("ngaysinh")[i].innerHTML = "Ngày sinh: " + userlist[i].ngaysinh;
                    document.getElementsByClassName("sdt")[i].innerHTML = "Số điện thoại: " + userlist[i].sdt;
                    document.getElementsByClassName("email")[i].innerHTML = "Email: " + userlist[i].email;
                    document.getElementsByClassName("sobaitest")[i].innerHTML = "Số bài test: " + userlist[i].sobaitest;
                }
            }
        } else{
            for(i = 0; i < bacsilist.length; i++) {
                if (typeof document.getElementsByClassName("ID")[(bacsilist.length)-1] == "undefined") {
                    createBacsiForm(i-userlist.length);
                    var AccountBS = bacsilist[i];
                    document.getElementsByClassName("userid")[i].innerHTML = "UserID: " + AccountBS.tendangnhap;
                    document.getElementsByClassName("hoten")[i].innerHTML = "Họ và Tên: " + AccountBS.hoten;
                    document.getElementsByClassName("manv")[i].innerHTML = "Mã số nhân viên: " + AccountBS.manv;
                    document.getElementsByClassName("chucvu")[i].innerHTML = "Chức vụ: " + AccountBS.chucvu; 
                    document.getElementsByClassName("sdt")[i].innerHTML = "Số điện thoại: " + AccountBS.sdt;
                }
            }
        }
        if( bacsilist.length != 0) {
            for(i = userlist.length; i < bacsilist.length+userlist.length; i++) {
                if (typeof document.getElementsByClassName("ID")[(bacsilist.length+userlist.length)-1] == "undefined") {
                    createBacsiForm(i-userlist.length);
                    var AccountBS = bacsilist[i-userlist.length];
                    document.getElementsByClassName("userid")[i].innerHTML = "UserID: " + AccountBS.tendangnhap;
                    document.getElementsByClassName("hoten")[i].innerHTML = "Họ và Tên: " + AccountBS.hoten;
                    document.getElementsByClassName("manv")[i-userlist.length].innerHTML = "Mã số nhân viên: " + AccountBS.manv;
                    document.getElementsByClassName("chucvu")[i-userlist.length].innerHTML = "Chức vụ: " + AccountBS.chucvu; 
                    document.getElementsByClassName("sdt")[i].innerHTML = "Số điện thoại: " + AccountBS.sdt;
                }
            }
        }
    } else{
        if(userlist.length != 0) {
            for(i = 0; i < userlist.length; i++) {
                if (typeof document.getElementsByClassName("ID")[userlist.length-1] == "undefined") {
                    createUserForm(i);
                    document.getElementsByClassName("userid")[i].innerHTML = "UserID: " + userlist[i].tendangnhap;
                    document.getElementsByClassName("hoten")[i].innerHTML = "Họ và Tên: " + userlist[i].hoten;
                    document.getElementsByClassName("gioitinh")[i].innerHTML = "Giới tính: " + userlist[i].gioitinh;
                    document.getElementsByClassName("ngaysinh")[i].innerHTML = "Ngày sinh: " + userlist[i].ngaysinh;
                    document.getElementsByClassName("sdt")[i].innerHTML = "Số điện thoại: " + userlist[i].sdt;
                    document.getElementsByClassName("email")[i].innerHTML = "Email: " + userlist[i].email;
                    document.getElementsByClassName("sobaitest")[i].innerHTML = "Số bài test: " + userlist[i].sobaitest;
                }
                document.getElementsByClassName("account")[i].style.display = "none";
                document.getElementsByClassName("account")[i].children[0].removeChild(document.getElementsByClassName("account")[i].children[0].children[2]);
                document.getElementsByClassName("account")[i].children[0].removeChild(document.getElementsByClassName("account")[i].children[0].children[2]);
            }
        } else{
            document.getElementById("list").innerHTML = ` <div class="account" style="font-size: 30px; text-align: center;">Hiện không có tài khoản nào trong cơ sở dữ liệu</div> `;
        }
    }
}

function createFilterAcc() {
    document.getElementById("list").innerHTML = "";
    var filter = document.createElement("div");
    filter.id = "filter";
    if(currentAdmin() != null) {
        var LoaiTaiKhoan = document.createElement("select");
        LoaiTaiKhoan.id = "LoaiTaiKhoan";
        LoaiTaiKhoan.innerHTML = `
            <option value="all">Loại tài khoản</option>
            <option value="Khách hàng">Khách hàng</option>
            <option value="Bác sĩ">Bác sĩ</option>
        `;
        filter.appendChild(LoaiTaiKhoan);
    }


    var search_hoten = document.createElement("input");
    search_hoten.id = "search-hoten";
    search_hoten.placeholder = "Họ và tên";

    var search_sdt = document.createElement("input");
    search_sdt.id = "search-sdt";
    search_sdt.placeholder = "Số điện thoại";
    search_sdt.pattern = "[0]{1}[0-9]{9}";  

    if(currentAdmin() == null) {
        (currentAdmin());
        search_hoten.style.width = "45%";
        search_sdt.style.width = "45%";
    }
      

    filter.appendChild(search_hoten);
    filter.appendChild(search_sdt);
    filter.onchange = function() {
        LocAccount();
    }
    document.getElementById("list").appendChild(filter);
    AccountList();

}

function LocAccount() {
    var temp = localStorage.getItem("userlist");
    var userlist = JSON.parse(temp);
    var temp1 = localStorage.getItem("bacsilist");
    var bacsilist = JSON.parse(temp1);
    var account = document.getElementsByClassName("account");

    var hoten = document.getElementById("search-hoten").value.toLowerCase();
    var sdt = document.getElementById("search-sdt").value;

    if(currentAdmin() != null) {
        for(i = 0; i < account.length; i++) {
            account[i].style.display = "block";
        }

        var loaiTaiKhoan = document.getElementById("LoaiTaiKhoan").value;

        if( loaiTaiKhoan != "all") {
            if( loaiTaiKhoan != "Khách hàng") {
                for(i = 0; i < userlist.length; i++) {
                    account[i].style.display = "none"
                }
            } else{
                for(i = userlist.length; i < bacsilist.length+userlist.length; i++) {
                    account[i].style.display = "none"
                }
            }
        } else{
            for(i = 0; i < account.length; i++) {
                account[i].style.display = "";
            }
        }

        if( hoten != "") {
            for( i = 0; i < account.length; i++) {
                let temp = account[i].children[0].children[1].textContent;
                let HoTenAccount = temp.split(": ");
                var UserName = HoTenAccount[HoTenAccount.length-1].toLowerCase();
                if(UserName.indexOf(hoten) > -1) {
                    account[i].style.display = "";
                } else{
                    account[i].style.display = "none";
                }
            }
        }

        if( sdt != "") {
            for( i = 0; i < account.length; i++) {
                let temp = account[i].children[3].textContent;
                let SDTAccount = temp.split(" ");
                var SDT = SDTAccount[SDTAccount.length-1];
                if(SDT.indexOf(sdt) > -1) {
                    account[i].style.display = "";
                } else{
                    account[i].style.display = "none";
                }
            }
        }
    } else{
        if( hoten != "") {
            for( i = 0; i < account.length; i++) {
                let temp = account[i].children[0].children[1].textContent;
                let HoTenAccount = temp.split(": ");
                var UserName = HoTenAccount[HoTenAccount.length-1].toLowerCase();
                if(UserName == hoten) {
                    account[i].style.display = "block";
                    (account[i].style.display);
                } else{
                    account[i].style.display = "none";
                    (account[i].style.display);
                }
            }
        }

        if( sdt != "") {
            for( i = 0; i < account.length; i++) {
                let temp = account[i].children[3].textContent;
                let SDTAccount = temp.split(" ");
                var SDT = SDTAccount[SDTAccount.length-1];
                if(SDT == sdt) {
                    account[i].style.display = "block";
                } else{
                    account[i].style.display = "none";
                }
            }
        }
        if (hoten != "" || sdt != "") {
            var soAccHien = 0;
            for( i = 0; i < account.length; i++) {
                if( account[i].style.display == "block") {
                    soAccHien++;
                } else{
                    continue;
                }
            }
            if(soAccHien == 1) {
                ThongKeBS(hoten,sdt);
            } else if(document.getElementById("Exam-ThongKe") != null) {
                document.getElementById("list").removeChild(document.getElementById("Exam-ThongKe"));
            }
        }        
    }
}

function createUserForm(i) {
    var account = document.createElement("div");
    account.className = "account";

    var account_header = document.createElement("div");
    account_header.className = "account-header";
    var p_userid = document.createElement("p");
    p_userid.className = "userid";
    p_userid.id = i;
    var p_hoten = document.createElement("p");
    p_hoten.className = "hoten";

    var p_gioitinh = document.createElement("p");
    p_gioitinh.className = "gioitinh";

    var p_ngaysinh = document.createElement("p");
    p_ngaysinh.className = "ngaysinh";

    var p_email = document.createElement("p");
    p_email.className = "email";

    var p_sdt = document.createElement("p");
    p_sdt.className = "sdt";

    var p_sobaitest = document.createElement("p");
    p_sobaitest.className = "sobaitest";

    var edit_button = document.createElement("button");
    edit_button.className = "edit-button"
    edit_button.innerHTML = `<i class="fas fa-edit"></i>`
    edit_button.value = i;
    edit_button.onclick = function() {
        localStorage.setItem("Index-Profile" , this.value)
        localStorage.setItem("Loai-Profile" , "User");
        open_editProfile();
    };
    var del_button = document.createElement("button");
    del_button.className = "del-button"
    del_button.innerHTML = `<i class="fa fa-trash"</i>`
    del_button.value = i;
    del_button.onclick = function() {
        localStorage.setItem("Index-Profile", this.value);
        localStorage.setItem("Loai-Profile" , "User");
        createConfirmForm();
    };


    account.appendChild(account_header);
    account.appendChild(p_gioitinh);
    account.appendChild(p_ngaysinh);
    account.appendChild(p_sdt);
    account.appendChild(p_email);
    account.appendChild(p_sobaitest);

    account_header.appendChild(p_userid);
    account_header.appendChild(p_hoten);
    account_header.appendChild(edit_button);
    account_header.appendChild(del_button);


    const list = document.getElementById("list");
    list.appendChild(account);
}

function createBacsiForm(i) {
    var account = document.createElement("div");
    account.className = "account";

    var account_header = document.createElement("div");
    account_header.className = "account-header";
    var p_userid = document.createElement("p");
    p_userid.className = "userid";
    p_userid.id = i;
    var p_hoten = document.createElement("p");
    p_hoten.className = "hoten";

    var p_manv = document.createElement("p");
    p_manv.className = "manv";

    var p_chucvu = document.createElement("p");
    p_chucvu.className = "chucvu";

    var p_sdt = document.createElement("p");
    p_sdt.className = "sdt";

    var edit_button = document.createElement("button");
    edit_button.className = "edit-button"
    edit_button.innerHTML = `<i class="fas fa-edit"></i>`
    edit_button.value = i;
    edit_button.onclick = function() {
        localStorage.setItem("Index-Profile" , this.value)
        localStorage.setItem("Loai-Profile" , "BacSi");
        open_editProfile();
    };
    var del_button = document.createElement("button");
    del_button.className = "del-button"
    del_button.innerHTML = `<i class="fa fa-trash"</i>`
    del_button.value = i;
    del_button.onclick = function() {
        localStorage.setItem("Index-Profile" , this.value);
        localStorage.setItem("Loai-Profile" , "BacSi");
        createConfirmForm();
    };

    account_header.appendChild(p_userid);
    account_header.appendChild(p_hoten);
    account_header.appendChild(edit_button);
    account_header.appendChild(del_button);

    account.appendChild(account_header);
    account.appendChild(p_manv);
    account.appendChild(p_chucvu);
    account.appendChild(p_sdt);

    const list = document.getElementById("list");
    list.appendChild(account);
}

function deleteProfile() {
    updateLichSuDelete();
    var temp = localStorage.getItem("userlist");
    var userlist = JSON.parse(temp);
    var temp2 = localStorage.getItem("bacsilist");
    var bacsilist = JSON.parse(temp2);
    var admin = currentAdmin();
    var loai = localStorage.getItem("Loai-Profile");
    if(admin != null) {
        var index = localStorage.getItem("Index-Profile");
    }else if(currentProfile() != null) {
        index = currentProfile();
        localStorage.removeItem("Login");
        var empty = {
            "isLogin": 0,
            "tendangnhap": "",
        }
        var temp1 = JSON.stringify(empty);
        localStorage.setItem("Login", temp1);
    }

    if( loai == "User") {
        userlist.splice(index, 1);
        var json = JSON.stringify(userlist);
        localStorage.setItem("userlist",json);
    } else{
        bacsilist.splice(index, 1);
        var json = JSON.stringify(bacsilist);
        localStorage.setItem("bacsilist",json);
    }

    if(localStorage.getItem("SoAccXoa") != null) {
        var new_SoAccXoa = parseInt(localStorage.getItem("SoAccXoa"));
        new_SoAccXoa++;
        localStorage.setItem("SoAccXoa", new_SoAccXoa);
    } else{
        localStorage.setItem("SoAccXoa", 1);
    }

    alert("Xóa thành công");
    // localStorage.removeItem("Index-Profile");
    location.reload();
}

function createConfirmForm() {
    ("Hiện Confirm");
    var confirm = document.createElement("div");
    confirm.id = "confirm";

    var h1 = document.createElement("h1");
    h1.innerHTML = "Xác Nhận"

    var p = document.createElement("p");
    p.innerHTML = "Bạn thực sự muốn xóa tài khoản này?";

    var yes_button = document.createElement("button");
    yes_button.id = "confirm-yes";
    yes_button.innerHTML = "Có";
    yes_button.onclick = function() {
        deleteProfile();
    }

    var no_button = document.createElement("button");
    no_button.id = "confirm-no";
    no_button.innerHTML = "Không";
    no_button.onclick = function() {
        var confirm = document.getElementById("confirm");
        document.body.removeChild(confirm);
    }

    confirm.appendChild(h1);
    confirm.appendChild(p);
    confirm.appendChild(yes_button);
    confirm.appendChild(no_button);
    document.body.appendChild(confirm);
    (localStorage.getItem("Index-Profile"));
}

function updateLichSuDelete() {
    var temp = localStorage.getItem("userlist");
    var userlist = JSON.parse(temp);
    var temp2 = localStorage.getItem("bacsilist");
    var bacsilist = JSON.parse(temp2);
    var profile;

    if(currentAdmin() != null) {
        var index = localStorage.getItem("Index-Profile");
        if( localStorage.getItem("Loai-Profile") == "User") {
            profile = userlist[index];    
        } else{
            profile = bacsilist[index];
        }
    } else if(currentProfile() != null){
        if( localStorage.getItem("Loai-Profile") == "User") {
            profile = userlist[currentProfile()];    
        } else{
            profile = bacsilist[currentProfile()];
        }
    }
    var temp1 = localStorage.getItem("examlist");
    var examlist = JSON.parse(temp1);

    for(i = 0; i < examlist.length; i++) {        
        var UserName = examlist[i].ChiTiet.NguoiThucHien;
        if(UserName == profile.tendangnhap && UserName.indexOf(" (Tài khoản đã bị xóa)") == -1) {
            var exam = {
                "ID": examlist[i].ID,
                "ChiTiet": {
                    "BaiTest": examlist[i].ChiTiet.BaiTest,
                    "NguoiThucHien": examlist[i].ChiTiet.NguoiThucHien + " (Tài khoản đã bị xóa)",
                    "ThoiGian": examlist[i].ChiTiet.ThoiGian,
                    "TinhTrang": examlist[i].ChiTiet.TinhTrang,
                    "DeNghi": examlist[i].ChiTiet.DeNghi,
                }
            }
            examlist[i] = exam;
        }
    }
    var json = JSON.stringify(examlist);
    localStorage.setItem("examlist",json);
    // localStorage.removeItem("Index-Profile");
}

function CheckKhoangTG(thoigianCC,thoigianBD, thoigianKT) {
    var ngayBD, thangBD, namBD, ngayKT, thangKT, namKT;
    namBD = parseInt(thoigianBD.slice(0,4));
    thangBD = parseInt(thoigianBD.slice(5,7));
    ngayBD = parseInt(thoigianBD.slice(8,10));
    namKT = parseInt(thoigianKT.slice(0,4));
    thangKT = parseInt(thoigianKT.slice(5,7));
    ngayKT = parseInt(thoigianKT.slice(8,10));

    var ngayCC, thangCC, namCC;
    namCC = parseInt(thoigianCC.slice(0,4));
    thangCC = parseInt(thoigianCC.slice(5,7));
    ngayCC = parseInt(thoigianCC.slice(8,10));

    if(namBD <= namCC && namKT >= namCC) {
        if(thangBD <= thangCC && thangKT >= thangCC) {
            if(ngayBD <= ngayCC && ngayKT >= ngayCC) {
                return true;
            } else{
                return false;
            }
        } else{
            return false;
        }
    } else{
        return false;
    }
}

function inAll() {
    var temp1 = localStorage.getItem("examlist");
    var examlist = JSON.parse(temp1);
    var temp = 0;
    for(k = 0; k < examlist.length; k++) {
        if (typeof document.getElementsByClassName("ID")[examlist.length-1] == "undefined") {
            createExamForm();
            var ChiTiet = examlist[k].ChiTiet; 
            document.getElementsByClassName("ID")[temp].innerHTML = examlist[k].ID;
            document.getElementsByClassName("BaiTest")[temp].innerHTML = "Thang đánh giá " + ChiTiet.BaiTest;
            document.getElementsByClassName("ThoiGian")[temp].innerHTML = ChiTiet.ThoiGian;
            document.getElementsByClassName("NguoiThucHien")[temp].innerHTML = "Người thực hiện: " + ChiTiet.NguoiThucHien;
            document.getElementsByClassName("TinhTrang")[temp].innerHTML = ChiTiet.TinhTrang;
            document.getElementsByClassName("DeNghi")[temp].innerHTML = ChiTiet.DeNghi;
            temp++; 
        }
    }
    if(currentAdmin() == null) {
        var exam = document.getElementsByClassName("exam");
        for( i = 1; i != exam.length+1; i++) {
            document.getElementById("list").children[i].style.display = "none";
        }
    }
}

function BoLocCore() {
    var list = document.getElementById("list");
    var exam = list.getElementsByClassName("exam");    
    for(x = 0; x < exam.length; x++) {
        exam[x].style.display = "none";
    }

    var loaiBaiTest = document.getElementById("LoaiBaiTest").value;

    var temp1 = localStorage.getItem("examlist");
    var examlist = JSON.parse(temp1);

    if(currentAdmin() != null) {
        var nguoiThucHien = document.getElementById("NguoiThucHien").value;
        var TGCuThe = document.getElementById("TGCuThe").value;
        var NgayBD = document.getElementById("NgayBD").value;
        var NgayKT = document.getElementById("NgayKT").value;

        if(loaiBaiTest != "all") {
            var arrayLoai = filterLoai(examlist,loaiBaiTest);
            for(i = 0; i < exam.length; i++) {
                for(j = 0; j < arrayLoai.length; j++) {
                    if(exam[i].children[0].children[0].textContent == arrayLoai[j].ID) {
                        exam[i].style.display = "block";
                    } else{
                        continue;
                    }
                }
            }
        } else{
            for(x = 0; x < exam.length; x++) {
                exam[x].style.display = "block";
            }
        }
    
        if(nguoiThucHien != "all") {
            var arrayNguoi = filterNguoi(examlist,nguoiThucHien);
            var temp10 = 0;
            if(arrayNguoi.length == 0) {
                for(x = 0; x < exam.length; x++) {
                    exam[x].style.display = "none";
                }
            } else{
                for(i = 0; i < exam.length; i++) {
                    if(exam[i].children[0].children[0].textContent == arrayNguoi[temp10].ID) {
                        if(temp10 == (arrayNguoi.length-1)) {
                            temp10 = arrayNguoi.length-1;
                        } else{
                            temp10++;
                        }
                    } else{
                        exam[i].style.display = "none";
                    }
                }
            }
        }
    
        if(TGCuThe != "") {
            for(i = 0; i < exam.length; i++) {
                if(exam[i].children[1].textContent == TGCuThe) {
                    continue;
                } else{
                    exam[i].style.display = "none";
                }
            }
        }
    
        if(NgayBD != "" && NgayKT != "") {
            for(i = 0; i < exam.length; i++) {
                if(CheckKhoangTG(exam[i].children[1].textContent,NgayBD,NgayKT)) {
                    continue;
                } else{
                    exam[i].style.display = "none";
                }
            }
        }
    } else{
        if(document.getElementById("exam-empty") != null) {
            document.getElementById("exam-empty").style.display = "block";
        }
        var userid = "";
        var hoten = document.getElementById("hoten").value.toLowerCase();
        var sdt = document.getElementById("sdt").value;

        if(hoten != "" || sdt != "") {
            var SoAccHien = 0;
            var temp = localStorage.getItem("userlist");
            if(temp != null) {
                var userlist = JSON.parse(temp);
                console.log(userlist);
                for(i = 0; i < userlist.length; i++) {
                    var UserID = (userlist[i].hoten).toLowerCase();
                    var SDT = userlist[i].sdt;
                    console.log(userlist[i].hoten);
                    console.log(userlist[i].sdt);
                    console.log(UserID == hoten || SDT == sdt);
                    if(UserID == hoten && SDT == sdt) {
                        userid = userlist[i].tendangnhap;
                        SoAccHien = 1;
                        break;
                    } else if(UserID == hoten || SDT == sdt ) {
                        userid = userlist[i].tendangnhap;
                        SoAccHien++;
                        continue;
                    } else{
                        userid = "";
                    }
                }
                if (SoAccHien != 1) {
                    userid = "";
                    var exam = document.createElement("div");
                    exam.className = "exam";
                    exam.id = "toomuch";
                    exam.style.fontSize = "30px";
                    exam.style.textAlign = "center";
                    exam.innerHTML = "Có quá nhiều bài đánh giá phù hợp trong cơ sở dữ liệu";
                    document.getElementById("list").appendChild(exam);
                } else if(document.getElementById("toomuch") != null) {
                    document.getElementById("list").removeChild(document.getElementById("toomuch"));
                }
            }
        } else{
            userid = document.getElementById("userid").value.toLowerCase();
        }

        console.log(loaiBaiTest);
        console.log(userid);
        if(userid != "") {
            if(loaiBaiTest != "all") {
                for(i = 0; i < exam.length; i++) {
                    let temp = exam[i].children[0].children[1].textContent.split(" ");
                    var LoaiBaiTest = temp[temp.length-1];
                    let temp1 = exam[i].children[2].textContent;
                    let HoTen = temp1.split(": ");
                    var UserID = HoTen[HoTen.length-1].toLowerCase();  

                    if(LoaiBaiTest == loaiBaiTest && UserID == userid) {
                        exam[i].style.display = "block";
                        console.log(exam[i]);
                        console.log(exam[i].style.display);
                    } else{
                        exam[i].style.display = "none";
                        console.log(exam[i]);
                        console.log(exam[i].style.display);
                    }
                }
            } else{
                for(i = 0; i < exam.length; i++) {
                    let temp = exam[i].children[2].textContent;
                    let HoTen = temp.split(": ");
                    var UserName = HoTen[HoTen.length-1].toLowerCase();  
                    if(UserName == userid) {
                        exam[i].style.display = "block";
                    }
                }    
            }
        }  else{
            for(i = 0; i < exam.length; i++) {
                exam[i].style.display = "none";
            }
        }

        // if(userid != "") {
        //     for(i = 0; i < exam.length; i++) {
        //         let temp = exam[i].children[2].textContent;
        //         let HoTen = temp.split(": ");
        //         var UserName = HoTen[HoTen.length-1].toLowerCase();    
        //         if(UserName == userid) {
        //             exam[i].style.display = "block";
        //         } else{
        //             continue;
        //         }        
        //     }
        // }

        
    }

    var SoExamHien = 0;
    for(i = 0; i < exam.length; i++) {
        if(exam[i].style.display == "block") {
            SoExamHien++;
        }
    }

    if(SoExamHien == 0 && document.getElementById("toomuch") == null) {
        var exam = document.createElement("div");
        exam.className = "exam";
        exam.id = "exam-empty";
        exam.style.fontSize = "30px";
        exam.style.textAlign = "center";
        exam.innerHTML = "Hiện không có bài đánh giá nào phù hợp trong cơ sở dữ liệu";
        document.getElementById("list").appendChild(exam);
    } else if(document.getElementById("exam-empty") != null) {
        document.getElementById("list").removeChild(document.getElementById("exam-empty"));
    }
}

function filterLoai(examlist,loaiBaiTest) {
    var arrayLoai = new Array();
    let temp = 0;
    for(i = 0; i < examlist.length; i++) {
        if( examlist[i].ChiTiet.BaiTest == loaiBaiTest) {
            arrayLoai[temp] = examlist[i];
            temp++;
        }
    }
    return arrayLoai;
}

function filterNguoi(examlist,nguoiThucHien) {
    var arrayNguoi = new Array();
    var temp = 0;
    for(i = 0; i < examlist.length; i++) {
        let temp1 = examlist[i].ChiTiet.NguoiThucHien;
        let temp2 = temp1.split(" ");
        var UserName = temp2[0];
        if( UserName == nguoiThucHien) {
            arrayNguoi[temp] = examlist[i];
            temp++;
        }
    }
    return arrayNguoi;   
}

function Boloc() {
    var list = document.getElementById("list");
    list.innerHTML = "";
    var filter = document.createElement("div");
    filter.id = "filter";

    var LoaiBaiTest = document.createElement("select");
    LoaiBaiTest.id = "LoaiBaiTest";
    LoaiBaiTest.innerHTML = `
        <option value="all">Tất cả</option>
        <optgroup label="Loại bài test">
            <option value="BDI">Beck (BDI)</option>
            <option value="DASS-21">DASS-21</option>
            <option value="DASS-42">DASS-42</option>
            <option value="GAD-7">GAD-7</option>
            <option value="PQH-9">PHQ-9</option>
            <option value="RADS10-20">RADS 10-20</option>
        </optgroup>
    `;

    if(currentAdmin() != null) {
        var NguoiThucHien = document.createElement("select");
        NguoiThucHien.id = "NguoiThucHien";
        NguoiThucHien.innerHTML = `
            <option value="all">Tất cả</option>
            <option value="Visitor">Khách viếng thăm</option>
            `;
    
        var temp = localStorage.getItem("userlist");
        var userlist = JSON.parse(temp);
        var lbl_user = document.createElement("optgroup");
        lbl_user.label = "Khách hàng";
        for(i = 0; i < userlist.length; i++) {
            var option = document.createElement("option");
            option.value = userlist[i].tendangnhap;
            option.text = userlist[i].hoten;
            lbl_user.appendChild(option);
        }
        NguoiThucHien.appendChild(lbl_user);
    
        var temp1 = localStorage.getItem("bacsilist");
        var bacsilist = JSON.parse(temp1);
        var lbl_bacsi = document.createElement("optgroup");
        lbl_bacsi.label = "Bác sĩ";
        for(i = 0; i < bacsilist.length; i++) {
            var option = document.createElement("option");
            option.value = bacsilist[i].tendangnhap;
            option.text = bacsilist[i].hoten;
            lbl_bacsi.appendChild(option);
        }
        NguoiThucHien.appendChild(lbl_bacsi);
    
        var TGCuThe = document.createElement("input");
        TGCuThe.id = "TGCuThe";
        TGCuThe.type = "text";
        TGCuThe.placeholder = "Ngày"
        TGCuThe.onfocus = function() {
            this.type="date";
        }
        TGCuThe.onblur = function() {
            this.type="text";
        }
        TGCuThe.onchange = function() {
            document.getElementById("NgayBD").value = "";
            document.getElementById("NgayKT").value = "";
        }
    
        var KhoangTG = document.createElement("div");
        KhoangTG.id = "KhoangTG";
        KhoangTG.innerHTML = `
            <input id="NgayBD" placeholder="Từ ngày" type="text" onfocus="(this.type='date')" onblur="(this.type='text')">
            <input id="NgayKT" placeholder="Đến ngày" type="text" onfocus="(this.type='date')" onblur="(this.type='text')">
        `
        KhoangTG.onchange = function() {
            document.getElementById("TGCuThe").value = "";
            document.getElementById("NgayKT").min = document.getElementById("NgayBD").value;
        }
    

    } else{
        var userid = document.createElement("input");
        userid.id = "userid";
        userid.style.width = "15%";
        userid.placeholder = "ID";

        var hoten = document.createElement("input");
        hoten.id = "hoten";
        hoten.style.width = "28%";
        hoten.placeholder = "Họ tên";

        var sdt = document.createElement("input");
        sdt.id = "sdt";
        sdt.style.width = "28%";
        sdt.placeholder = "Số điện thoại";
    }
    
    filter.appendChild(LoaiBaiTest);
    if(currentAdmin() != null) {
        filter.appendChild(NguoiThucHien);
        filter.appendChild(TGCuThe);
        filter.appendChild(KhoangTG);
    } else{
        filter.appendChild(userid);
        filter.appendChild(hoten);
        filter.appendChild(sdt);
    }
    filter.onchange = function() {
        BoLocCore();
    }
    list.appendChild(filter);
    inAll();
}



function createThongKeForm() {
    if( currentAdmin() != null) {
        var Account_ThongKe = document.createElement("div");
        Account_ThongKe.id = "Account-ThongKe";

        var Account_Tong = document.createElement("div");
        Account_Tong.id = "Account-Tong";
        
        var Account_expand_collapse = document.createElement("button");
        Account_expand_collapse.className = "expand-collapse";
        Account_expand_collapse.type = "button";
        Account_expand_collapse.innerHTML = `
            <i style="font-size: 40px;" class='fas fa-angle-right'></i>
        `;
        Account_Tong.appendChild(Account_expand_collapse);

        var Account_SoLieu = document.createElement("p");
        Account_SoLieu.id = "Account-Tong-SoLieu";
        Account_SoLieu.textContent = "Tổng số tài khoản: ";
        Account_Tong.appendChild(Account_SoLieu);
        var Account_after_expand = document.createElement("div");
        Account_after_expand.className = "after-expand";
        Account_after_expand.innerHTML = `
            <p id="Account-User"></p>
            <p id="Account-Bacsi"></p>
            <p id="Account-DaXoa"></p>    
        `;

        Account_ThongKe.appendChild(Account_Tong);
        Account_ThongKe.appendChild(Account_after_expand);
        document.getElementById("list").appendChild(Account_ThongKe);
    }

    var Exam_ThongKe = document.createElement("div");
    Exam_ThongKe.id = "Exam-ThongKe";
    var Exam_Tong = document.createElement("div");
    Exam_Tong.id = "Exam-Tong";
    var Exam_expand_collapse = document.createElement("button");
    Exam_expand_collapse.className = "expand-collapse";
    Exam_expand_collapse.type = "button";
    Exam_expand_collapse.innerHTML = `
        <i style="font-size: 40px;" class='fas fa-angle-right'></i>
    `;
    Exam_Tong.appendChild(Exam_expand_collapse);
    var Exam_SoLieu = document.createElement("p");
    Exam_SoLieu.id = "Exam-Tong-SoLieu";
    Exam_SoLieu.textContent = "Tổng số bài đánh giá đã làm: ";
    Exam_Tong.appendChild(Exam_SoLieu);
    var Exam_after_expand = document.createElement("div");
    Exam_after_expand.className = "after-expand";
    Exam_after_expand.innerHTML = `
        <p id="bdi">Số bài đánh giá Beck (BDI) đã làm: </p>
        <p id="dass-21">Số bài đánh giá DASS-21 đã làm: </p>
        <p id="dass-42">Số bài đánh giá DASS-42 đã làm: </p>
        <p id="gad-7">Số bài đánh giá GAD-7 đã làm: </p>
        <p id="phq-9">Số bài đánh giá PHQ-9 đã làm: </p>
        <p id="rads10-20">Số bài đánh giá RADS 10-20 đã làm: </p>
    `;

    Exam_ThongKe.appendChild(Exam_Tong);
    Exam_ThongKe.appendChild(Exam_after_expand);

    document.getElementById("list").appendChild(Exam_ThongKe);

    var expandcollapse = document.getElementsByClassName("expand-collapse");
    for(i = 0; i < expandcollapse.length; i++) {
        expandcollapse[i].onclick = function() {
            var button = this;
            var content = this.parentNode.nextElementSibling;
        
            if (content.style.maxHeight){
                content.style.maxHeight = null;
                button.innerHTML = ` <i style="font-size: 40px;" class='fas fa-angle-right'></i> `
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                button.innerHTML = ` <i style="font-size: 40px;" class='fas fa-angle-down'></i> `
            }
        }
    }
}

function ThongKe() {
    document.getElementById("list").innerHTML = "";
    createThongKeForm();
    var temp = localStorage.getItem("userlist");
    var temp1 = localStorage.getItem("bacsilist");

    var SoAccXoa, SoAccUser, SoAccBacsi;
    if(temp == null) {
        SoAccUser = 0;
    } else{
        var userlist = JSON.parse(temp);
        SoAccUser = userlist.length;
    }

    if(temp1 == null) {
        SoAccBacsi = 0;
    } else{
        var bacsilist = JSON.parse(temp1);
        SoAccBacsi = bacsilist.length;
    }

    if(localStorage.getItem("SoAccXoa") == null || localStorage.getItem("SoAccXoa") == 0) {
        SoAccXoa = 0;
    } else{
        SoAccXoa = parseInt(localStorage.getItem("SoAccXoa"));
    }
    if(currentAdmin() != null) {
        document.getElementById("Account-Tong-SoLieu").innerHTML += (parseInt(SoAccUser) + parseInt(SoAccBacsi) + parseInt(SoAccXoa));
        document.getElementById("Account-User").innerHTML = "Số tài khoản khách hàng: " + SoAccUser;
        document.getElementById("Account-Bacsi").innerHTML = "Số tài khoản bác sĩ: " + SoAccBacsi;
        document.getElementById("Account-DaXoa").innerHTML = "Số tài khoản đã xóa: " + SoAccXoa;
    }

    var temp1 = localStorage.getItem("examlist");
    var examlist = JSON.parse(temp1);
    document.getElementById("Exam-Tong-SoLieu").innerHTML += parseInt(localStorage.getItem("TongSoBaiTest"));
        var bdi = 0, dass21 = 0, dass42 = 0, gad7 = 0, phq9 = 0, rads1020 = 0;
        for(i = 0; i < examlist.length; i++) {  
            var LoaiBaiTest = examlist[i].ChiTiet.BaiTest;
            switch(LoaiBaiTest) {
                case 'BDI':
                    bdi += 1;
                break;
                
                case 'DASS-21':
                    dass21 += 1;
                break;
                            
                case 'DASS-42':
                    dass42 += 1;
                break;
                            
                case 'GAD-7':
                    gad7 += 1;
                break;
                            
                case 'PQH-9':
                    phq9 += 1;
                break;
                            
                case 'RADS10-20':
                    rads1020 += 1;
                break;
            }
        }    

    document.getElementById("bdi").innerHTML += bdi;
    document.getElementById("dass-21").innerHTML += dass21;
    document.getElementById("dass-42").innerHTML += dass42;
    document.getElementById("gad-7").innerHTML += gad7;
    document.getElementById("phq-9").innerHTML += phq9;
    document.getElementById("rads10-20").innerHTML += rads1020;
}

function ThongKeBS(Ten,SDT) {
    if(document.getElementById("Exam-ThongKe") != null) {
        document.getElementById("list").removeChild(document.getElementById("Exam-ThongKe"));
    }
    createThongKeForm();
    var temp = localStorage.getItem("userlist");
    var profile;
    if(temp != null) {
        var userlist = JSON.parse(temp);
        for( i = 0; i < userlist.length; i++) {
            if(Ten != "" && SDT != "") {
                if(userlist[i].hoten.toLowerCase() == Ten && userlist[i].sdt == SDT) {
                    profile = userlist[i];
                } else{
                    continue;
                }
            } else if(userlist[i].hoten.toLowerCase() == Ten || userlist[i].sdt == SDT) {
                profile = userlist[i];
                break;
            } else{
                continue;
            }
        }
    }

    var temp1 = localStorage.getItem("examlist");
    var examlist = JSON.parse(temp1);
    document.getElementById("Exam-Tong-SoLieu").innerHTML += parseInt(profile.sobaitest);
    var bdi = 0, dass21 = 0, dass42 = 0, gad7 = 0, phq9 = 0, rads1020 = 0;
    for(i = 0; i < examlist.length; i++) {  
        if(examlist[i].ChiTiet.NguoiThucHien == profile.tendangnhap) {
            var LoaiBaiTest = examlist[i].ChiTiet.BaiTest;
            switch(LoaiBaiTest) {
                case 'BDI':
                    bdi += 1;
                break;
                
                case 'DASS-21':
                    dass21 += 1;
                break;
                            
                case 'DASS-42':
                    dass42 += 1;
                break;
                            
                case 'GAD-7':
                    gad7 += 1;
                break;
                            
                case 'PQH-9':
                    phq9 += 1;
                break;
                            
                case 'RADS10-20':
                    rads1020 += 1;
                break;
            }
        }
            
    }       
        
    document.getElementById("bdi").innerHTML += bdi;
    document.getElementById("dass-21").innerHTML += dass21;
    document.getElementById("dass-42").innerHTML += dass42;
    document.getElementById("gad-7").innerHTML += gad7;
    document.getElementById("phq-9").innerHTML += phq9;
    document.getElementById("rads10-20").innerHTML += rads1020;
}

function XoaAllAcc() {
    var confirm = document.createElement("div");
    confirm.id = "confirm";

    var h1 = document.createElement("h1");
    h1.innerHTML = "Xác Nhận"

    var p = document.createElement("p");
    p.innerHTML = "Bạn muốn xóa tất cả tài khoản?";

    var yes_button = document.createElement("button");
    yes_button.id = "confirm-yes";
    yes_button.innerHTML = "Có";
    yes_button.onclick = function() {
        var new_SoAccXoa = parseInt(localStorage.getItem("SoAccXoa"));
        var new_SoAccUser = parseInt(localStorage.getItem("userlist").length);
        new_SoAccUser += parseInt(localStorage.getItem("bacsilist").length);
        if(new_SoAccXoa != null) {
            new_SoAccXoa += new_SoAccUser;
            localStorage.setItem("SoAccXoa", new_SoAccXoa);
        }else{
            localStorage.setItem("SoAccXoa", new_SoAccUser);
        }

        var temp = localStorage.getItem("examlist");
        var examlist = JSON.parse(temp);
            
        for(i = 0; i < examlist.length; i++) {
            if(examlist[i].ChiTiet.NguoiThucHien.indexOf("(Tài khoản đã bị xóa)") == -1) {
                var exam = {
                    "ID": examlist[i].ID,
                    "ChiTiet": {
                        "BaiTest": examlist[i].ChiTiet.BaiTest,
                        "NguoiThucHien": examlist[i].ChiTiet.NguoiThucHien + " (Tài khoản đã bị xóa)",
                        "ThoiGian": examlist[i].ChiTiet.ThoiGian,
                        "TinhTrang": examlist[i].ChiTiet.TinhTrang,
                        "DeNghi": examlist[i].ChiTiet.DeNghi,
                    }
                }
                examlist[i] = exam;
            }
        }
        var json = JSON.stringify(examlist);
        localStorage.setItem("examlist",json);
        localStorage.removeItem("userlist");
        localStorage.removeItem("bacsilist");
        alert("Xóa thành công");
        document.body.removeChild(confirm);
    }

    var no_button = document.createElement("button");
    no_button.id = "confirm-no";
    no_button.innerHTML = "Không";
    no_button.onclick = function() {
        var confirm = document.getElementById("confirm");
        document.body.removeChild(confirm);
    }


    confirm.appendChild(h1);
    confirm.appendChild(p);
    confirm.appendChild(yes_button);
    confirm.appendChild(no_button);
    document.body.appendChild(confirm);
}

function XoaAllExam() {
    var confirm = document.createElement("div");
    confirm.id = "confirm";

    var h1 = document.createElement("h1");
    h1.innerHTML = "Xác Nhận"

    var p = document.createElement("p");
    p.innerHTML = "Bạn muốn xóa tất cả lịch sử đánh giá?";

    var yes_button = document.createElement("button");
    yes_button.id = "confirm-yes";
    yes_button.innerHTML = "Có";
    yes_button.onclick = function() {
        localStorage.removeItem("TongSoBaiTest");
        localStorage.removeItem("examlist");
        var confirm = document.getElementById("confirm");
        document.body.removeChild(confirm);
    }

    var no_button = document.createElement("button");
    no_button.id = "confirm-no";
    no_button.innerHTML = "Không";
    no_button.onclick = function() {
        var confirm = document.getElementById("confirm");
        document.body.removeChild(confirm);
    }

    confirm.appendChild(h1);
    confirm.appendChild(p);
    confirm.appendChild(yes_button);
    confirm.appendChild(no_button);
    document.body.appendChild(confirm);
}

function ChucNang() {
    var list = document.getElementById("list");
    list.innerHTML = "";
    var temp1 = document.createElement("button");
    temp1.id = "Tao-TKuser";
    temp1.textContent = "Tạo tài khoản khách hàng";
    temp1.onclick = function() {
        open_register();
    };
    list.appendChild(temp1);

    if(currentAdmin() != null) {
        var temp4 = document.createElement("button");
        temp4.id = "Tao-TKbacsi";
        temp4.textContent = "Tạo tài khoản bác sĩ";
        temp4.onclick = function() {
            registerBacSi();
        }
    
        var temp2 = document.createElement("button");
        temp2.id = "Del-TK";
        temp2.textContent = "Xóa tất cả tài khoản";
        temp2.onclick = function() {
            XoaAllAcc();
        }
    
        var temp3 = document.createElement("button");
        temp3.id = "Del-Test";
        temp3.textContent = "Xóa tất cả lịch sử đánh giá";
        temp3.onclick = function() {
            XoaAllExam();
        }
        list.appendChild(temp4);
        list.appendChild(temp2);
        list.appendChild(temp3);
    } else{
        temp1.style.float = "none";
        temp1.style.width = "100%";
    }
}

function close_Accbs() {
    document.body.removeChild(document.getElementById("register-bacsi"));
}

function nextstep_Accbs() {
    document.getElementById("bacsi-step1").style.display = "none";
    document.getElementById("bacsi-step2").style.display = "block";
    document.getElementById("register-bacsi").style.height = "36%";
    document.getElementById("register-bacsi").style.top = "32%";
}

function prevstep_Accbs() {
    document.getElementById("bacsi-step1").style.display = "block";
    document.getElementById("bacsi-step2").style.display = "none";
    document.getElementById("register-bacsi").style.height = "50%";
    document.getElementById("register-bacsi").style.top = "25%";
}

function register_bs() {
    var tendangnhap = document.getElementById("TenDangNhap-bs").value;
    var matkhau = document.getElementById("MatKhau-bs").value;
    var hoten = document.getElementById("HoTen-bs").value;
    var manv = document.getElementById("MaNV").value;
    var sdt = document.getElementById("SDT-bs").value;
    var chucvu = document.getElementById("ChucVu").value;    

    if(dupUserID(tendangnhap)) {
        var temp = localStorage.getItem("bacsilist");
        var bacsilist = JSON.parse(temp);
        var account = {
            "tendangnhap": tendangnhap,
            "matkhau": matkhau,
            "hoten": hoten,
            "manv": manv,
            "sdt": sdt,
            "chucvu": chucvu,
        }
        bacsilist[bacsilist.length] = account;
        let json = JSON.stringify(bacsilist);
        localStorage.setItem("bacsilist",json);
        document.body.removeChild(document.getElementById("register-bacsi"));
        alert("Đăng ký thành công");
    } 
    else {
        alert("Tên đăng nhập này đã được sử dụng!");
    }
}

function registerBacSi() {
    var form = document.createElement("div");
    form.id = "register-bacsi";
    form.innerHTML = `
        <button id="close" onclick="close_Accbs()">
            <i class="fa fa-times" style="font-size:40px;"></i>
        </button>
        <h1>Tài khoản cho cán bộ, bác sĩ</h1>
        <form id="bacsi-form" onsubmit="register_bs()">
            <div id="bacsi-step1">
                <div class="info">
                    <h2>Họ và tên:</h2>
                    <input type="text" id="HoTen-bs" required>
                </div>
                <div class="info">
                        <h2>Mã số nhân viên:</h2>
                    <input type="text" id="MaNV" required>   
                </div>
                <div class="info">
                    <h2>Số điện thoại: </h2>
                    <input type="tel" id="SDT-bs" pattern="[0]{1}[0-9]{9}">
                </div>
                <div class="info">
                    <h2>Chức vụ:</h2> 
                    <select id="ChucVu" style="border-radius: 20px; padding: 5px 30px; width: 50%;border: #dddfe2 2px solid; margin: 10px 0px 10px 3%; text-align: center;" required>
                        <option value="">-----Chọn-----</option>
                        <option value="Bác sĩ lâm sàng">Bác sĩ lâm sàng</option>
                        <option value="Bác sĩ chuẩn đoán">Bác sĩ chuẩn đoán</option>
                        <option value="Bác sĩ trị liệu">Bác sĩ trị liệu</option>
                    </select>
                </div>
                <button class="bacsi-register" type="button" onclick="nextstep_Accbs()">Tiếp tục</button>
            </div>

            <div id="bacsi-step2">
                <button id="bacsi-goback" type="button" onclick="prevstep_Accbs()">
                    <i class="fa fa-arrow-left" style="font-size:40px;"></i>
                </button>

                <div class="info">
                    <h2>Tên đăng nhập (Username):</h2>
                    <input type="text" id="TenDangNhap-bs" required>
                </div>
                <div class="info">
                    <h2>Mật khẩu (Password):</h2>
                    <input type="password" id="MatKhau-bs" required>
                </div>
                <button class="bacsi-register" type="submit">Đăng ký</button>
            </div>
        </form>       
    `;
    document.body.appendChild(form);
}