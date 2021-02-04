'use strict';

exports.ok = function (values, res) {
  let data = {
    status: 200,
    values: values,
  };

  res.json(data);
  res.end();
};

exports.oknested = function (values, res) {
  const hasil = values.reduce((rows, row) => {
    if (rows[row.nama]) {
      let group = rows[row.nama];
      if (Array.isArray(group.matakuliah)) {
        group.matakuliah.push(row.matakuliah);
      } else {
        group.matakuliah = [group.matakuliah, row.matakuliah];
      }
    } else {
      rows[row.nama] = row;
    }
    return rows;
  }, {});

  const data = {
    status: '200',
    values: hasil,
  };

  res.json(data);
  res.end();
};
