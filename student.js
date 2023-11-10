
function isValidEmail(email) { // test định dạng của email
    return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(email)
}
function save() {
    //khi người dùng ấn vô lưu thông tin dữ liệu sẽ lưu vào 
    let fullname = document.getElementById('fullname').value
    let Khoa = document.getElementById('year').value
    let email = document.getElementById('email').value
    let phone = document.getElementById('phone').value
    let garden = '';
    // khai bao khi dung radio 
    if (document.getElementById('men').checked) {
        garden = document.getElementById('men').value;
    } else if (document.getElementById('women').checked) {
        garden = document.getElementById('women').value;
    }

    // hiện tên và báo lỗi
    if (_.isEmpty(fullname)) {
        fullname = '';
        document.getElementById('fullname-error').innerHTML = 'Vui lòng nhập họ và tên';
    } else if (fullname.length <= 2) { // đièu kiện nhỏ hơn 2 kí tự 
        document.getElementById('fullname-error').innerHTML = 'Không hợp lệ';
        fullname = '';// néeu chữ chỉ có 2 kí tự thì nó sẽ ko lưu đúng mà trả về rỗng

    }
    else {
        document.getElementById('fullname-error').innerHTML = ''; // đúng sẽ ko hiện 
    }
    // hiện email và báo lỗi
    if (_.isEmpty(email)) {
        email = '';// neu eamil ko dien tra ve rong ko luu
        document.getElementById('email-error').innerHTML = 'Vui lòng nhập email';
    } else if (!isValidEmail(email)) { // khi email ko đúng định dạng có @
        email = ''; // email ko hop le se ko luu va tra ve rong
        document.getElementById('email-error').innerHTML = 'Email không hợp lệ';
    } else {
        document.getElementById('email-error').innerHTML = '';
    }
    // hiện sô điện thoại và báo lỗi
    if (_.isEmpty(phone)) {
        phone = '';// ko nhập số sẽ ko lưu và trả về rỗng
        document.getElementById('email-error').innerHTML = 'Vui lòng nhập sô';
    } else if (phone.length > 10 || phone.length < 10) { // đièu kiện nếu sốlớnn hơnn hoặcc nhỏỏ hơnn 10
        phone = '';// nếu lớn hơn hoặc nhỏ hơn 10 sẽ trả về rỗng ko lưu
        document.getElementById('phone-error').innerHTML = 'Số không hợp lệ';
    } else {
        document.getElementById('phone-error').innerHTML = '';
    }
    // hien bao loi gioi tinh
    if (_.isEmpty(garden)) {
        garden = ''; // ko chọn giới tính sẽ ko lưu và trả về rỗng

        document.getElementById('garden-error').innerHTML = 'Vui lòng chọn giới tính';
    } else {
        document.getElementById('garden-error').innerHTML = '';
    }
    if (fullname && Khoa && email && phone && garden) {

        // tao mang push object nay vao
        let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
        students.push({
            fullname: fullname,
            Khoa: Khoa,
            email: email,
            phone: phone,
            garden: garden,
        });
        localStorage.setItem('students', JSON.stringify(students));
        this.renderListstudent();
    }
}
function renderListstudent() {
    let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
    //tạo tanle để in danh sách 
    if (students.length === 0) {
        document.getElementById('list_students').style.display = 'none';
    }
    document.getElementById('list_students').style.display = 'block';

    let tableContent = ` <tr>  
     <td>SỐ</td>
     <td>Họ và tên</td>
     <td>Khóa</td>
     <td>Email</td>
     <td>Điện thoại</td>
     <td>Giới tính</td>
     <td>Hành động</td>
 </tr>` ;
    // td $ để nội suy chuyển dữ liệu vào danh sách sinh viên
    // index để tăng stt
    students.forEach((student, index) => {
        let StudentId = index;

        let gardenLabel = parseInt(student.garden) === 1 ? 'Nam' : 'Nữ';
        index++;
        tableContent += ` <tr>
         <td>${index}</td>
         <td>${student.fullname}</td>
         <td>${student.Khoa}</td>
         <td>${student.email}</td>
         <td>${student.phone}</td>
         <td>${student.garden}</td>
         <td>
        <button class='a1'><a class='edit' href="#">Sửa</a></button> | <button class='a2'><a class='delete' href="#" onclick='deleteStudent(${StudentId})'>Xóa</a></button>
         </td>
     </tr>`;

    })
    document.getElementById('view-student').innerHTML = tableContent;
}
function deleteStudent(id) {
    let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
    students.splice(id, 1);
    localStorage.setItem('students', JSON.stringify(students));
    this.renderListstudent();
}
