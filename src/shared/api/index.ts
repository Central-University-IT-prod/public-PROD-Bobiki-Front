import axios from "axios";
import {
  AllMeetings,
  AllMeetingsMeeting,
  PostMeeting,
  Product,
  User,
  freeSlots,
} from "../types/api";

class Api {
  private baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getProducts() {
    return axios.get<{ products: Product[] }>(`${this.baseUrl}/products`);
  }
  async getProduct(productId: string) {
    return axios.get(`${this.baseUrl}/products/${productId}/documents`);
  }
  async getCurrUser() {
    return await axios.get<User>(`${this.baseUrl}/current_user`);
  }

  async getFreeTime(day: string, minutes: number) {
    return axios.get<freeSlots>(
      `${this.baseUrl}/meetings/free_time/${day}/${minutes}`
    );
  }

  createPost(postMeeting: PostMeeting) {
    return axios.post(`${this.baseUrl}/meetings/create`, postMeeting);
  }

  async getUserMeetings() {
    return await axios.get<AllMeetings>(`${this.baseUrl}/user/meetings/all`);
  }

  async getUserMeeting(meetingId: string) {
    return await axios.get<AllMeetingsMeeting>(
      `${this.baseUrl}/user/meetings/${meetingId}`
    );
  }

  async deleteMeeting(meetingId: string) {
    return await axios.delete(`${this.baseUrl}/meetings/${meetingId}`);
  }

  async editMeeting(meetingId: string, data: any) {
    return await axios.patch(`${this.baseUrl}/meetings/${meetingId}`, data);
  }
}

export const api = new Api(import.meta.env.VITE_API_URL);
