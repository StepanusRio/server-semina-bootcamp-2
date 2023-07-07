const Events = require("../../api/v1/events/model");
const { checkingImages } = require("./serviceImages");
const { checkingTalent } = require("./serviceTalents");
const { checkingCategories } = require("./serviceCategories");

const { BadRequestError, NotFoundError } = require("../../errors");

const getAllEvents = async (req) => {
  const { keyword, category, talent, status } = req.query;
  let condition = { organizer: req.user.organizer };

  if (keyword) {
    condition = { ...condition, title: { $regex: keyword, $options: 'i' } };
  }

  if (category) {
    condition = { ...condition, category: category };
  }

  if (talent) {
    condition = { ...condition, talent: talent };
  }

  if (['Published', 'Draft'].includes(status)) {
    condition = { ...condition, statusEvent: status };
  }

  const result = await Events.find(condition)
    .populate({ path: 'image', select: '_id name' })
    .populate({
      path: 'category',
      select: '_id name',
    })
    .populate({
      path: 'talent',
      select: '_id name role image',
      populate: { path: 'image', select: '_id  name' },
    });

  return result;
};

const createEvents = async (req) => {
  const {
    title,
    date,
    about,
    tagline,
    venueName,
    keyPoint,
    statusEvent,
    tickets,
    image,
    category,
    talent,
  } = req.body;

  // cari image, category dan talent dengan field id
  await checkingImages(image);
  await checkingCategories(category);
  await checkingTalent(talent);

  // cari Events dengan field name
  const check = await Events.findOne({ title });

  // apa bila check true / data Events sudah ada maka kita tampilkan error bad request dengan message pembicara duplikat
  if (check) throw new BadRequestError('Event name has ben Created');

  const result = await Events.create({
    title,
    date,
    about,
    tagline,
    venueName,
    keyPoint,
    statusEvent,
    tickets,
    image,
    category,
    talent,
    organizer: req.user.organizer
  });

  return result;
};

const getOneEvents = async (req) => {
  const { id } = req.params;

  const result = await Events.findOne({ _id: id, organizer: req.user.organizer })
    .populate({ path: 'image', select: '_id name' })
    .populate({
      path: 'category',
      select: '_id name',
    })
    .populate({
      path: 'talent',
      select: '_id name role image',
      populate: { path: 'image', select: '_id  name' },
    });

  if (!result)
    throw new NotFoundError(`No found event with id :  ${id}`);

  return result;
};

const updateEvents = async (req) => {
  const { id } = req.params;
  const {
    title,
    date,
    about,
    tagline,
    venueName,
    keyPoint,
    statusEvent,
    tickets,
    image,
    category,
    talent,
  } = req.body;

  // cari image, category dan talent dengan field id
  await checkingImages(image);
  await checkingCategories(category);
  await checkingTalent(talent);

  const checkEvent = await Events.findOne({
    _id: id
  })
  // jika id result false / null maka akan menampilkan error `No found event with id` yang dikirim client
  if (!checkEvent) throw new NotFoundError(`No found event with id :  ${id}`);

  // cari Events dengan field name dan id selain dari yang dikirim dari params
  const check = await Events.findOne({
    title,
    organizer: req.user.organizer,
    _id: { $ne: id },
  });

  // apa bila check true / data Events sudah ada maka kita tampilkan error bad request dengan message pembicara duplikat
  if (check) throw new BadRequestError('Event name has ben Created');

  const result = await Events.findOneAndUpdate(
    { _id: id },
    {
      title,
      date,
      about,
      tagline,
      venueName,
      keyPoint,
      statusEvent,
      tickets,
      image,
      category,
      talent,
      organizer: req.user.organizer
    },
    { new: true, runValidators: true }
  );

  return result;
};

const deleteEvents = async (req) => {
  const { id } = req.params;

  const result = await Events.findOne({
    _id: id,
    organizer: req.user.organizer
  });

  if (!result)
    throw new NotFoundError(`No found event with id :  ${id}`);

  await Events.findOneAndRemove({ _id: id, organizer: req.user.organizer })

  return result;
};

const changeStatusEvents = async (req) => {
  const { id } = req.params;
  const { statusEvent } = req.body;

  if (!['Draft', 'Published'].includes(statusEvent)) {
    throw new BadRequestError("There is No Option for this statusEvent");
  }

  const checkEvent = await Events.findOne({
    _id: id,
    organizer: req.user.organizer
  });
  if (!checkEvent) {
    throw new NotFoundError(`No found event with id :  ${id}`)
  }
  checkEvent.statusEvent = statusEvent;
  await checkEvent.save();
  return checkEvent
}

module.exports = {
  getAllEvents,
  createEvents,
  getOneEvents,
  updateEvents,
  deleteEvents,
  changeStatusEvents
};
