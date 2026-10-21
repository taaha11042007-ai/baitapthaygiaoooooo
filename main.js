let bookings = [
    {
        bookingCode: "CIN-001",
        customerName: "Nguyễn Văn An",
        movieTitle: "Ánh Trăng Cuối Phố",
        ticketCount: 2,
        pricePerTicket: 90000,
        totalAmount: 194400
    },
    {
        bookingCode: "CIN-002",
        customerName: "Trần Thị Bình",
        movieTitle: "Biệt Đội Sao Băng",
        ticketCount: 4,
        pricePerTicket: 90000,
        totalAmount: 349920
    },
    {
        bookingCode: "CIN-003",
        customerName: "Lê Minh Châu",
        movieTitle: "Mùa Hè Rực Lửa",
        ticketCount: 6,
        pricePerTicket: 110000,
        totalAmount: 641520
    }
];

// Chuẩn hóa tên.
function normalizeName(value) {
    return value
        .trim()
        .replace(/\s+/g, " ")
        .split(" ")
        .map(function (word) {
            return word.charAt(0).toUpperCase() +
                word.slice(1).toLowerCase();
        })
        .join(" ");
}

// Kiểm tra mã đặt vé.
function validateBookingCode(code) {
    if (code === "") {
        return "Chưa nhập mã đặt vé";
    }

    if (code.length < 6) {
        return "Độ dài nhỏ hơn 6 ký tự";
    }

    if (!code.startsWith("CIN-")) {
        return 'Sai tiền tố "CIN-"';
    }

    if (/\s/.test(code)) {
        return "Chứa khoảng trắng";
    }

    if (findBookingIndex(code) !== -1) {
        return "Mã đặt vé đã tồn tại";
    }

    return "";
}

// Tìm vị trí đơn đặt vé.
function findBookingIndex(code) {
    for (let i = 0; i < bookings.length; i++) {
        if (bookings[i].bookingCode === code) {
            return i;
        }
    }

    return -1;
}

// Nhập số nguyên dương.
function inputPositiveInteger(message) {
    while (true) {
        const input = prompt(message);

        if (input === null) {
            return null;
        }

        const value = input.trim();

        if (/^\d+$/.test(value) && Number(value) > 0) {
            return Number(value);
        }

        console.log("Vui lòng nhập số nguyên lớn hơn 0.");
    }
}

// Tính tổng tiền.
function calculateTotal(ticketCount, pricePerTicket) {
    const baseCost = ticketCount * pricePerTicket;

    let discount = 0;

    if (ticketCount >= 4) {
        discount = Math.round(baseCost * 0.1);
    }

    const serviceFee = Math.round(
        (baseCost - discount) * 0.08
    );

    const totalAmount =
        baseCost - discount + serviceFee;

    return {
        baseCost: baseCost,
        discount: discount,
        serviceFee: serviceFee,
        totalAmount: totalAmount
    };
}

// Định dạng tiền Việt Nam.
function formatCurrency(amount) {
    return amount.toLocaleString("vi-VN") + " VNĐ";
}

// Hiển thị danh sách đơn đặt vé.
function displayBookings(list) {
    if (list.length === 0) {
        console.log("Danh sách đơn đặt vé trống");
        return;
    }

    let totalRevenue = 0;

    console.log("");
    console.log("=====================================================");
    console.log("DANH SÁCH ĐƠN ĐẶT VÉ");
    console.log("=====================================================");

    for (let i = 0; i < list.length; i++) {
        const booking = list[i];

        console.log(
            (i + 1) +
            ". " +
            booking.bookingCode +
            " - " +
            booking.customerName +
            " - " +
            booking.movieTitle
        );

        console.log(
            "   SL: " +
            booking.ticketCount +
            " | Giá: " +
            formatCurrency(booking.pricePerTicket) +
            " | Tổng TT: " +
            formatCurrency(booking.totalAmount)
        );

        totalRevenue += booking.totalAmount;
    }

    console.log("-----------------------------------------------------");

    console.log(
        "Tổng: " +
        list.length +
        " đơn đặt vé – Doanh thu: " +
        formatCurrency(totalRevenue)
    );
}

// Thêm đơn đặt vé.
function addBooking() {
    const codeInput = prompt("Nhập mã đặt vé:");

    if (codeInput === null) {
        console.log("Đã hủy thao tác thêm");
        return;
    }

    const bookingCode = codeInput.trim().toUpperCase();

    const codeError = validateBookingCode(bookingCode);

    if (codeError !== "") {
        console.log("Lỗi: " + codeError);
        return;
    }

    let customerInput = prompt(
        "Nhập tên khách hàng:"
    );

    if (customerInput === null) {
        console.log("Đã hủy thao tác thêm");
        return;
    }

    while (customerInput.trim() === "") {
        customerInput = prompt(
            "Tên khách hàng không được rỗng. Nhập lại:"
        );

        if (customerInput === null) {
            console.log("Đã hủy thao tác thêm");
            return;
        }
    }

    const customerName = normalizeName(customerInput);

    let movieInput = prompt("Nhập tên phim:");

    if (movieInput === null) {
        console.log("Đã hủy thao tác thêm");
        return;
    }

    while (movieInput.trim() === "") {
        movieInput = prompt(
            "Tên phim không được rỗng. Nhập lại:"
        );

        if (movieInput === null) {
            console.log("Đã hủy thao tác thêm");
            return;
        }
    }

    const movieTitle = normalizeName(movieInput);

    const ticketCount = inputPositiveInteger(
        "Nhập số vé:"
    );

    if (ticketCount === null) {
        console.log("Đã hủy thao tác thêm");
        return;
    }

    const pricePerTicket = inputPositiveInteger(
        "Nhập giá mỗi vé:"
    );

    if (pricePerTicket === null) {
        console.log("Đã hủy thao tác thêm");
        return;
    }

    const payment = calculateTotal(
        ticketCount,
        pricePerTicket
    );

    const booking = {
        bookingCode: bookingCode,
        customerName: customerName,
        movieTitle: movieTitle,
        ticketCount: ticketCount,
        pricePerTicket: pricePerTicket,
        totalAmount: payment.totalAmount
    };

    bookings.push(booking);

    console.log("");
    console.log("=====================================================");
    console.log("THÊM ĐƠN ĐẶT VÉ THÀNH CÔNG");
    console.log("=====================================================");
    console.log("Mã đặt vé: " + bookingCode);
    console.log("Khách hàng: " + customerName);
    console.log("Tên phim: " + movieTitle);
    console.log("Số vé: " + ticketCount);
    console.log(
        "Giá mỗi vé: " +
        formatCurrency(pricePerTicket)
    );
    console.log(
        "Chi phí cơ sở: " +
        formatCurrency(payment.baseCost)
    );
    console.log(
        "Giảm giá: " +
        formatCurrency(payment.discount)
    );
    console.log(
        "Phí dịch vụ: " +
        formatCurrency(payment.serviceFee)
    );
    console.log(
        "Tổng thanh toán: " +
        formatCurrency(payment.totalAmount)
    );
}

// Cập nhật đơn đặt vé.
function updateBooking() {
    const codeInput = prompt(
        "Nhập mã đặt vé cần cập nhật:"
    );

    if (codeInput === null) {
        console.log("Đã hủy cập nhật");
        return;
    }

    const bookingCode = codeInput.trim().toUpperCase();

    const index = bookings.findIndex(function (booking) {
        return booking.bookingCode === bookingCode;
    });

    if (index === -1) {
        console.log(
            "Không tìm thấy đơn đặt vé có mã " +
            bookingCode
        );
        return;
    }

    const booking = bookings[index];

    const oldTotal = booking.totalAmount;

    const newTicketCount = inputPositiveInteger(
        "Nhập số vé mới:"
    );

    if (newTicketCount === null) {
        console.log("Đã hủy cập nhật");
        return;
    }

    const newPricePerTicket = inputPositiveInteger(
        "Nhập giá mỗi vé mới:"
    );

    if (newPricePerTicket === null) {
        console.log("Đã hủy cập nhật");
        return;
    }

    const payment = calculateTotal(
        newTicketCount,
        newPricePerTicket
    );

    booking.ticketCount = newTicketCount;
    booking.pricePerTicket = newPricePerTicket;
    booking.totalAmount = payment.totalAmount;

    console.log("Cập nhật thành công");

    console.log(
        "Tổng thanh toán cũ: " +
        formatCurrency(oldTotal)
    );

    console.log(
        "Tổng thanh toán mới: " +
        formatCurrency(payment.totalAmount)
    );
}

// Xóa đơn đặt vé.
function deleteBooking() {
    const codeInput = prompt(
        "Nhập mã đặt vé cần xóa:"
    );

    if (codeInput === null) {
        console.log("Đã hủy thao tác xóa");
        return;
    }

    const bookingCode = codeInput.trim().toUpperCase();

    const index = findBookingIndex(bookingCode);

    if (index === -1) {
        console.log(
            "Không tìm thấy đơn đặt vé có mã " +
            bookingCode
        );
        return;
    }

    const confirmation = prompt(
        "Xác nhận xóa đơn " +
        bookingCode +
        "? (Y/N)"
    );

    if (
        confirmation === null ||
        confirmation.trim().toUpperCase() !== "Y"
    ) {
        console.log(
            "Đã hủy thao tác xóa, còn " +
            bookings.length +
            " đơn"
        );
        return;
    }

    bookings.splice(index, 1);

    console.log(
        "Xóa thành công, còn " +
        bookings.length +
        " đơn"
    );
}

// Tìm kiếm đơn theo tên phim.
function searchBookings() {
    const keywordInput = prompt(
        "Nhập từ khóa tìm kiếm:"
    );

    if (
        keywordInput === null ||
        keywordInput.trim() === ""
    ) {
        console.log("Chưa nhập từ khóa tìm kiếm");
        return;
    }

    const keyword = keywordInput.trim().toLowerCase();

    const results = [];

    for (let i = 0; i < bookings.length; i++) {
        const movieTitle =
            bookings[i].movieTitle.toLowerCase();

        if (movieTitle.includes(keyword)) {
            results.push(bookings[i]);
        }
    }

    if (results.length === 0) {
        console.log(
            "Không tìm thấy đơn đặt vé phù hợp"
        );
        return;
    }

    displayBookings(results);
}

// Báo cáo tổng kết.
function displaySummaryReport() {
    if (bookings.length === 0) {
        console.log("Chưa có đơn đặt vé nào");
        return;
    }

    let totalRevenue = 0;
    let highestBooking = bookings[0];

    for (let i = 0; i < bookings.length; i++) {
        totalRevenue += bookings[i].totalAmount;

        if (
            bookings[i].totalAmount >
            highestBooking.totalAmount
        ) {
            highestBooking = bookings[i];
        }
    }

    const averageRevenue = Math.round(
        totalRevenue / bookings.length
    );

    console.log("");
    console.log("==================================================");
    console.log("BÁO CÁO TỔNG KẾT ĐƠN ĐẶT VÉ");
    console.log("==================================================");

    console.log(
        "Tổng số đơn đặt vé : " +
        bookings.length
    );

    console.log(
        "Tổng doanh thu : " +
        formatCurrency(totalRevenue)
    );

    console.log(
        "Doanh thu trung bình : " +
        formatCurrency(averageRevenue)
    );

    console.log(
        "Đơn cao nhất : " +
        highestBooking.bookingCode +
        " - " +
        formatCurrency(
            highestBooking.totalAmount
        )
    );

    console.log("==================================================");
}

// Chạy menu chính bằng prompt.
function runProgram() {
    let isRunning = true;

    while (isRunning) {
        const choiceInput = prompt(
            "=====================================================\n" +
            "HỆ THỐNG QUẢN LÝ ĐẶT VÉ MOONLIGHT CINEMA\n" +
            "=====================================================\n" +
            "1. Hiển thị danh sách đơn đặt vé\n" +
            "2. Thêm đơn đặt vé mới\n" +
            "3. Cập nhật đơn đặt vé\n" +
            "4. Xóa đơn đặt vé\n" +
            "5. Tìm kiếm đơn đặt vé theo tên phim\n" +
            "0. Thoát chương trình\n" +
            "=====================================================\n" +
            "Vui lòng nhập lựa chọn của bạn (0 - 5):"
        );

        if (choiceInput === null) {
            console.log(
                "Lựa chọn không hợp lệ. Vui lòng nhập từ 0 đến 5."
            );
            continue;
        }

        const choice = choiceInput.trim();

        if (!/^[0-5]$/.test(choice)) {
            console.log(
                "Lựa chọn không hợp lệ. Vui lòng nhập từ 0 đến 5."
            );
            continue;
        }

        switch (choice) {
            case "1":
                displayBookings(bookings);
                break;

            case "2":
                addBooking();
                break;

            case "3":
                updateBooking();
                break;

            case "4":
                deleteBooking();
                break;

            case "5":
                searchBookings();
                break;

            case "0":
                displaySummaryReport();

                console.log(
                    "Cảm ơn bạn đã sử dụng hệ thống Moonlight Cinema!"
                );

                isRunning = false;
                break;

            default:
                console.log(
                    "Lựa chọn không hợp lệ."
                );
                break;
        }
    }
}

runProgram();