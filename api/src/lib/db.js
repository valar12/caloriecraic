const memory = { profiles: new Map(), checkIns: new Map() };

async function saveProfile(userId, profile) {
  memory.profiles.set(userId, profile);
}

async function getProfile(userId) {
  return memory.profiles.get(userId) || null;
}

async function saveCheckIn(userId, checkIn) {
  const record = { ...checkIn, id: checkIn.id || randomId(), syncStatus: 'synced' };
  const records = memory.checkIns.get(userId) || [];
  memory.checkIns.set(userId, records.filter((item) => item.id !== record.id).concat(record));
  return record;
}

async function listCheckIns(userId) {
  return (memory.checkIns.get(userId) || []).sort((a, b) => a.checkInDate.localeCompare(b.checkInDate));
}

function randomId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    const r = Math.random() * 16 | 0;
    const v = char === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

module.exports = { getProfile, listCheckIns, saveCheckIn, saveProfile };
