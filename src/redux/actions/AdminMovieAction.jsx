import baseAPI from "../../apis/baseAPI";

export const AdminCreateMovieAction = async (movie) => {
  try {
    const formData = new FormData();
    for (const key in movie) {
      formData.append(key, movie[key]);
    }
    formData.append("maNhom", "GP03");
    const res = await baseAPI.post("/QuanLyPhim/ThemPhimUploadHinh", formData);
    return res;
  } catch (error) {
    if (error.response) {
      throw error.response.data?.content;
    }
    throw error;
  }
};
export const AdminEditMovieAction = async (movie) => {
  try {
    const formData = new FormData();
    for (const key in movie) {
      if (key !== "hinhAnh") {
        formData.append(key, movie[key]);
      } else {
        if (movie[key] !== undefined) {
          formData.append(key, movie[key]);
        }
        console.log("Key, movie[key]: ", key, movie[key]);
      }
    }
    formData.append("maNhom", "GP03");
    const res = await baseAPI.post("/QuanLyPhim/CapNhatPhimUpload", formData);
    console.log(res);
    return res;
  } catch (error) {
    if (error.response) {
      throw error.response.data?.content;
    }
    throw error.message;
  }
};

export const AdminGetMovieDetailsAction = async (id) => {
  try {
    const result = await baseAPI.get(
      `/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`
    );
    return result;
  } catch (error) {
    if (error.response) {
      throw error.response.data?.content;
    }
    throw error;
  }
};

export const AdminDeleteMovieAction = async (id) => {
  try {
    const result = await baseAPI.delete(`/QuanLyPhim/XoaPhim?MaPhim=${id}`);
    return result;
  } catch (error) {
    if (error.response) {
      throw error.response.data?.content;
    }
    throw error;
  }
};

export const AdminGetMovieSystemsAction = async () => {
  try {
    const result = await baseAPI.get("/QuanLyRap/LayThongTinHeThongRap");
    return result;
  } catch (error) {
    if (error.response) {
      throw error.response.data?.content;
    }
    throw error;
  }
};

export const AdminGetMovieComplexAction = async (id) => {
  try {
    const result = await baseAPI.get(
      `/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${id}`
    );
    return result;
  } catch (error) {
    if (error.response) {
      throw error.response.data?.content;
    }
    throw error;
  }
};

export const AdminCreateMovieShowtimesAction = async (showtimes) => {
  try {
    const result = await baseAPI.post("/QuanLyDatVe/TaoLichChieu", showtimes);
    return result;
  } catch (error) {
    if (error.response) {
      throw error.response.data?.content;
    }
    throw error;
  }
};
