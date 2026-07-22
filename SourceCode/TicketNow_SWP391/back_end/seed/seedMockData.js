/**
 * Seed mock data cho TicketNow — chạy: npm run seed (từ thư mục back_end)
 * Yêu cầu: MongoDB đang chạy tại MONGO_URI trong .env
 */
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../model/User.js";
import Event from "../model/Event.js";
import Location from "../model/Location.js";
import Organizer from "../model/Organizer.js";
import Booking from "../model/Booking.js";
import Review from "../model/Review.js";
import Notification from "../model/Notification.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/TicketNow";

const categorySchema = new mongoose.Schema({
  _id: String,
  name: String,
  description: String,
});
const Category = mongoose.model("SeedCategory", categorySchema, "Categories");

const ticketSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: String, default: "available", enum: ["available", "sold"] },
  createdAt: { type: Date, default: Date.now },
});
const TicketCatalog = mongoose.model("SeedTicket", ticketSchema, "Tickets");

const IMG = {
  music: "https://picsum.photos/seed/music/1200/600",
  workshop: "https://picsum.photos/seed/workshop/1200/600",
  sport: "https://picsum.photos/seed/sport/1200/600",
  market: "https://picsum.photos/seed/market/1200/600",
  festival: "https://picsum.photos/seed/festival/1200/600",
  comedy: "https://picsum.photos/seed/comedy/1200/600",
  tech: "https://picsum.photos/seed/tech/1200/600",
  run: "https://picsum.photos/seed/run/1200/600",
};

const categories = [
  { _id: "cat_music", name: "Âm nhạc", description: "Concert, liveshow, nhạc hội" },
  { _id: "cat_workshop", name: "Workshop / Kỹ năng", description: "Hội thảo, đào tạo" },
  { _id: "cat_sport", name: "Thể thao", description: "Giải chạy, thi đấu thể thao" },
  { _id: "cat_market", name: "Hội chợ", description: "Chợ phiên, triển lãm, festival" },
];

const locations = [
  {
    _id: "loc_hcm_nhht",
    venueName: "Nhà hát Thành phố HCM",
    address: "97 Công trường Lam Sơn, Quận 1",
    city: "TP. Hồ Chí Minh",
    province: "TP. Hồ Chí Minh",
    capacity: 1800,
  },
  {
    _id: "loc_hn_caugiay",
    venueName: "Trung tâm Hội nghị Quốc gia",
    address: "Số 1 Thăng Long, Nam Từ Liêm",
    city: "Hà Nội",
    province: "Hà Nội",
    capacity: 5000,
  },
  {
    _id: "loc_dn_arena",
    venueName: "Cung thể thao Tiên Sơn",
    address: "Hải Châu, Đà Nẵng",
    city: "Đà Nẵng",
    province: "Đà Nẵng",
    capacity: 8000,
  },
  {
    _id: "loc_hcm_whitepalace",
    venueName: "White Palace Phạm Văn Đồng",
    address: "588 Phạm Văn Đồng, Thủ Đức",
    city: "TP. Hồ Chí Minh",
    province: "TP. Hồ Chí Minh",
    capacity: 3000,
  },
];

const eventTemplates = [
  {
    title: "Monsoon Music Festival 2026",
    description:
      "Lễ hội âm nhạc đa thể loại với sự góp mặt của các nghệ sĩ trong và ngoài nước. Không gian mở, ánh sáng lung linh và âm thanh chất lượng cao.",
    categoryId: "cat_music",
    locationId: "loc_hn_caugiay",
    daysFromNow: 14,
    ticketsAvailable: 320,
    imageUrl: IMG.festival,
  },
  {
    title: "Đen Vâu Live Concert — Chuyến đi của trái tim",
    description:
      "Đêm nhạc đặc biệt dành cho fan hâm mộ. Setlist gồm các hit mới nhất và những ca khúc kinh điển.",
    categoryId: "cat_music",
    locationId: "loc_hcm_nhht",
    daysFromNow: 21,
    ticketsAvailable: 150,
    imageUrl: IMG.music,
  },
  {
    title: "Stand-up Comedy Night — Cười thả ga",
    description:
      "Đêm hài với các nghệ sĩ stand-up comedy nổi tiếng. Phù hợp cho buổi tối cuối tuần cùng bạn bè.",
    categoryId: "cat_music",
    locationId: "loc_hcm_whitepalace",
    daysFromNow: 7,
    ticketsAvailable: 200,
    imageUrl: IMG.comedy,
  },
  {
    title: "Workshop UI/UX Design cho người mới",
    description:
      "Khóa học thực hành thiết kế giao diện, từ wireframe đến prototype Figma. Có chứng nhận tham dự.",
    categoryId: "cat_workshop",
    locationId: "loc_hcm_whitepalace",
    daysFromNow: 10,
    ticketsAvailable: 80,
    imageUrl: IMG.workshop,
  },
  {
    title: "Tech Career Summit 2026",
    description:
      "Hội thảo nghề nghiệp công nghệ: tuyển dụng, phỏng vấn, và chia sẻ kinh nghiệm từ các chuyên gia IT.",
    categoryId: "cat_workshop",
    locationId: "loc_hn_caugiay",
    daysFromNow: 18,
    ticketsAvailable: 500,
    imageUrl: IMG.tech,
  },
  {
    title: "Da Nang International Marathon",
    description:
      "Giải chạy bộ quốc tế với cự ly 5K, 10K, 21K và 42K. Đi qua các điểm du lịch nổi bật của Đà Nẵng.",
    categoryId: "cat_sport",
    locationId: "loc_dn_arena",
    daysFromNow: 30,
    ticketsAvailable: 1200,
    imageUrl: IMG.run,
  },
  {
    title: "FPTU Badminton Open 2026",
    description:
      "Giải cầu lông sinh viên mở rộng. Đơn nam, đơn nữ và đôi nam nữ. Có giải thưởng hấp dẫn.",
    categoryId: "cat_sport",
    locationId: "loc_hn_caugiay",
    daysFromNow: 12,
    ticketsAvailable: 300,
    imageUrl: IMG.sport,
  },
  {
    title: "Saigon Creative Market — Mùa hè rực rỡ",
    description:
      "Chợ phiên sáng tạo với hơn 100 gian hàng handmade, ẩm thực và workshop mini miễn phí.",
    categoryId: "cat_market",
    locationId: "loc_hcm_whitepalace",
    daysFromNow: 5,
    ticketsAvailable: 1000,
    imageUrl: IMG.market,
  },
  {
    title: "Triển lãm Nghệ thuật Đương đại",
    description:
      "Không gian trưng bày tác phẩm của các nghệ sĩ trẻ Việt Nam. Có tour guide và góc check-in.",
    categoryId: "cat_market",
    locationId: "loc_hcm_nhht",
    daysFromNow: 25,
    ticketsAvailable: 400,
    imageUrl: IMG.festival,
  },
  {
    title: "Acoustic Night — Unplugged & Chill",
    description:
      "Đêm nhạc acoustic ấm cúng tại phòng hát nhỏ. Sức chứa giới hạn, trải nghiệm gần gũi nghệ sĩ.",
    categoryId: "cat_music",
    locationId: "loc_hcm_nhht",
    daysFromNow: 3,
    ticketsAvailable: 60,
    imageUrl: IMG.music,
  },
];

const ticketTypes = [
  { type: "Standard", price: 150000 },
  { type: "VIP", price: 350000 },
  { type: "Student", price: 80000 },
];

const reviewComments = [
  { rating: 5, comment: "Sự kiện tuyệt vời, âm thanh và ánh sáng rất chất lượng!" },
  { rating: 4, comment: "Tổ chức ổn, chỉ hơi đông ở khu vực check-in." },
  { rating: 5, comment: "Giá vé xứng đáng, sẽ tham gia lại lần sau." },
  { rating: 3, comment: "Nội dung hay nhưng bãi đỗ xe hơi chật." },
  { rating: 4, comment: "MC dẫn chương trình rất vui, không khí sôi động." },
];

async function clearCollections() {
  await Promise.all([
    Category.deleteMany({}),
    Location.deleteMany({}),
    Event.deleteMany({}),
    User.deleteMany({}),
    Organizer.deleteMany({}),
    TicketCatalog.deleteMany({}),
    Booking.deleteMany({}),
    Review.deleteMany({}),
    Notification.deleteMany({}),
  ]);
  console.log("🧹 Đã xóa dữ liệu cũ");
}

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log("✅ Kết nối MongoDB:", MONGO_URI);

  await clearCollections();

  await Category.insertMany(categories);
  await Location.insertMany(locations);
  console.log(`📂 ${categories.length} categories, ${locations.length} locations`);

  const passwordHash = await bcrypt.hash("Demo@123", 10);
  const orgPasswordHash = await bcrypt.hash("Organizer@123", 10);

  const demoUser = await User.create({
    name: "Nguyễn Văn Demo",
    email: "demo@gmail.com",
    passwordHash,
    phone: "0912345678",
    studentId: "SE171234",
    gender: "Nam",
    dob: "2003-05-15",
    avatar: "https://i.pravatar.cc/150?u=demo@gmail.com",
  });

  const organizerUser = await User.create({
    name: "Trần Thị Organizer",
    email: "organizer@gmail.com",
    passwordHash: orgPasswordHash,
    phone: "0987654321",
  });

  console.log("👤 Tài khoản demo:");
  console.log("   User:     demo@gmail.com / Demo@123");
  console.log("   Organizer: organizer@gmail.com / Organizer@123");

  const now = new Date();
  const createdEvents = [];

  for (const tpl of eventTemplates) {
    const eventDate = new Date(now);
    eventDate.setDate(eventDate.getDate() + tpl.daysFromNow);
    eventDate.setHours(19, 0, 0, 0);

    const event = await Event.create({
      title: tpl.title,
      description: tpl.description,
      categoryId: tpl.categoryId,
      locationId: tpl.locationId,
      date: eventDate,
      ticketsAvailable: tpl.ticketsAvailable,
      imageUrl: tpl.imageUrl,
    });
    createdEvents.push(event);

    const catalogTickets = ticketTypes.map((t) => ({
      eventId: event._id,
      type: t.type,
      price: t.price,
      status: "available",
    }));
    await TicketCatalog.insertMany(catalogTickets);
  }

  console.log(`🎉 ${createdEvents.length} sự kiện + loại vé`);

  const organizer = await Organizer.create({
    userId: organizerUser._id,
    organizationName: "TicketNow Events Co.",
    description: "Đơn vị tổ chức sự kiện văn hóa — giải trí hàng đầu miền Nam.",
    contactPhone: "02812345678",
    address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
    socialLinks: {
      facebook: "https://facebook.com/ticketnow",
      website: "https://ticketnow.example.com",
    },
    events: createdEvents.slice(0, 4).map((e) => e._id),
  });

  const bookingData = [
    { eventIdx: 0, quantity: 2, totalPrice: 700000 },
    { eventIdx: 3, quantity: 1, totalPrice: 150000 },
    { eventIdx: 7, quantity: 3, totalPrice: 450000 },
  ];

  for (const b of bookingData) {
    const ev = createdEvents[b.eventIdx];
    await Booking.create({
      userId: demoUser._id,
      eventId: ev._id,
      quantity: b.quantity,
      totalPrice: b.totalPrice,
      status: "confirmed",
      paymentId: `mock_pay_${ev._id.toString().slice(-6)}`,
    });
  }

  console.log(`🎟️ ${bookingData.length} booking mẫu cho demo user`);

  const reviewEvents = createdEvents.slice(0, 5);
  let reviewCount = 0;
  for (const ev of reviewEvents) {
    for (let i = 0; i < reviewComments.length; i++) {
      const author = i % 2 === 0 ? demoUser : organizerUser;
      await Review.create({
        eventId: ev._id,
        userId: author._id,
        rating: reviewComments[i].rating,
        comment: reviewComments[i].comment,
      });
      reviewCount++;
    }
  }

  console.log(`⭐ ${reviewCount} reviews`);

  await Notification.insertMany([
    {
      userId: demoUser._id,
      title: "Nhắc nhở sự kiện",
      message: `Sự kiện "${createdEvents[0].title}" sẽ diễn ra trong 2 tuần tới. Chuẩn bị sẵn vé nhé!`,
      eventId: createdEvents[0]._id,
      read: false,
      sentAt: new Date(),
    },
    {
      userId: demoUser._id,
      title: "Đặt vé thành công",
      message: "Bạn đã đặt vé thành công cho Workshop UI/UX Design cho người mới.",
      eventId: createdEvents[3]._id,
      read: true,
      sentAt: new Date(),
    },
  ]);

  console.log("🔔 2 notifications mẫu");
  console.log("\n✅ Seed hoàn tất! Chạy backend (npm start) và frontend (npm start) để xem UI.");
  console.log("   Đăng nhập bằng demo@gmail.com / Demo@123 để xem vé, review, yêu thích.\n");

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("❌ Seed thất bại:", err);
  process.exit(1);
});
