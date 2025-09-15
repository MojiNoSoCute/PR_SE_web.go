// Mock data provider for development without Supabase
import fs from "fs";
import path from "path";

class MockDataProvider {
  constructor() {
    this.dataDir = path.resolve(process.cwd(), "sample-data");
    this.cache = new Map();
  }

  loadData(filename) {
    if (this.cache.has(filename)) {
      return this.cache.get(filename);
    }

    try {
      const filePath = path.join(this.dataDir, filename);
      const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
      this.cache.set(filename, data);
      return data;
    } catch (error) {
      console.warn(`Failed to load ${filename}:`, error.message);
      return filename.includes(".json") ? [] : {};
    }
  }

  // Mock Supabase-like API
  from(table) {
    const tableMap = {
      university_info: "university-info.json",
      faculty: "faculty.json",
      student_works: "student-works.json",
      publications: "publications.json",
      announcements: "announcements.json",
    };

    const filename = tableMap[table];
    if (!filename) {
      throw new Error(`Unknown table: ${table}`);
    }

    const data = this.loadData(filename);

    return {
      select: (fields = "*") => ({
        data: Array.isArray(data) ? data : [data],
        error: null,
      }),

      eq: (field, value) => ({
        data: Array.isArray(data)
          ? data.filter((item) => item[field] === value)
          : data[field] === value
          ? [data]
          : [],
        error: null,
      }),

      limit: (count) => ({
        data: Array.isArray(data) ? data.slice(0, count) : [data],
        error: null,
      }),

      order: (field, options = {}) => {
        if (!Array.isArray(data)) return { data: [data], error: null };

        const sorted = [...data].sort((a, b) => {
          if (options.ascending === false) {
            return b[field] > a[field] ? 1 : -1;
          }
          return a[field] > b[field] ? 1 : -1;
        });

        return { data: sorted, error: null };
      },
    };
  }
}

export const mockDataProvider = new MockDataProvider();
