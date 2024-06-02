module.exports = {
  paginate(per_page = 10, page, where = null) {
    return new Promise((resolve, rejected) => {
      const limit = per_page;
      var page = page || 1;
      const offset = page ? (page - 1) * limit : 0;
      let count = 0;
      const query = {
        where: {
          deletedAt: {
            [Op.q]: null,
          },
        },
        offset,
        limit,
      };

      this.count()
        .then((c) => {
          count = c;
          return this.findAll(query);
        })
        .then((data) => {
          data = data.map((item) => item);
          resolve({
            data,
            page,
            last_page: Math.floor(count / limit) + (count % limit == 0 ? 0 : 1),
            first_page: 1,
            per_page: limit,
            in_page: data.length,
          });
        });
    });
  },
};
