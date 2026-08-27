class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryStrCopy = { ...this.queryStr };

    //Deleting some feilds forcategory filter
    const removingFeilds = ["keyword", "page", "limit"];
    removingFeilds.forEach((key) => delete queryStrCopy[key]);

    //Filter for price and rating
    let querystr = JSON.stringify(queryStrCopy);

    querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(querystr));
    
    return this;
}
pagination(resultPerPage) {
    const currPage = Number(this.queryStr.page) || 1;
    const skip = (currPage - 1) * resultPerPage;
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
    

  }
}

module.exports = ApiFeatures;
