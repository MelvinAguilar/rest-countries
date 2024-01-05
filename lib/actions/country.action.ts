"use server";

import Country from "@/lib/database/country.model";
import { GetCountryParams } from "./shared.types";
import { FilterQuery } from "mongoose";
import { connectToDatabase } from "../moongose";

export async function getCountryList(params: GetCountryParams) {
  try {
    connectToDatabase();

    const { page = 1, pageSize = 10, searchQuery, filter, sort } = params;

    const skip = (page - 1) * pageSize;
    const limit = pageSize;

    const query: FilterQuery<typeof Country> = {};

    if (searchQuery) {
      query.$or = [
        { name: { $regex: searchQuery, $options: "i" } },
        { capital: { $regex: searchQuery, $options: "i" } },
      ];
    }

    if (filter) {
      query.region = filter;
    }

    let sortQuery = {};
    if (sort) {
      const [sortField, sortDirection] = sort.split(":");
      sortQuery = { [sortField]: sortDirection === "asc" ? 1 : -1 };
    }

    const countries = await Country.find(query)
      .skip(skip)
      .limit(limit)
      .sort(sortQuery);

    const total = await Country.countDocuments(query);

    const hasMore = total > page * pageSize;

    return { countries, total, hasMore };
  } catch (error) {
    console.log("Error getting country list: ", error);
    throw error;
  }
}

export async function getCountryByName(name: String) {
  try {
    connectToDatabase();
    const country = await Country.findOne({ name });

    if (!country) {
      throw new Error("Country not found");
    }

    if (!country.borders.length) {
      return country;
    }

    const borderCountries = await Country.find({
      alpha3Code: { $in: country.borders },
    });

    country.borders = borderCountries.map((country) => country.name);
    // country.borders = borderCountries

    return country;
  } catch (error) {
    console.log("Error getting country by name: ", error);
    throw error;
  }
}
