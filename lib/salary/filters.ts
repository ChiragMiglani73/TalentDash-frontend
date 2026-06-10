import type {
  SalaryRecord,
  SalarySearchParams,
  SortDirection,
  SortField,
} from "@/types/salary";

const PAGE_SIZE = 25;

export { PAGE_SIZE };

export function parseLevels(
  level: string | string[] | undefined,
): string[] {
  if (!level) {
    return [];
  }

  return Array.isArray(level)
    ? level
    : level.split(",").filter(Boolean);
}

export function parseSort(sort?: string): {
  field: SortField;
  direction: SortDirection;
} {
  const map: Record<
    string,
    { field: SortField; direction: SortDirection }
  > = {
    total_comp_desc: {
      field: "total_compensation",
      direction: "desc",
    },
    total_comp_asc: {
      field: "total_compensation",
      direction: "asc",
    },
    base_desc: {
      field: "base_salary",
      direction: "desc",
    },
    base_asc: {
      field: "base_salary",
      direction: "asc",
    },
  };

  return (
    map[sort ?? ""] ?? {
      field: "total_compensation",
      direction: "desc",
    }
  );
}

export function filterSalaries(
  records: SalaryRecord[],
  params: SalarySearchParams,
): SalaryRecord[] {
  const levels = parseLevels(params.level);
  const companyQ = params.company?.trim().toLowerCase();
  const roleQ = params.role?.trim().toLowerCase();
  const locationQ = params.location?.trim().toLowerCase();

  return records.filter((r) => {
    if (
      companyQ &&
      !r.company.toLowerCase().includes(companyQ) &&
      !r.company_slug.includes(companyQ)
    ) {
      return false;
    }

    if (
      roleQ &&
      !r.role.toLowerCase().includes(roleQ)
    ) {
      return false;
    }

    if (
      levels.length > 0 &&
      !levels.includes(r.level_standardized)
    ) {
      return false;
    }

    if (
      locationQ &&
      !r.location.toLowerCase().includes(locationQ)
    ) {
      return false;
    }

    if (
      params.currency &&
      r.currency !== params.currency
    ) {
      return false;
    }

    return true;
  });
}

function compareStrings(
  a: string,
  b: string,
  direction: SortDirection,
): number {
  const cmp = a.localeCompare(b);

  return direction === "asc" ? cmp : -cmp;
}

export function sortSalaries(
  records: SalaryRecord[],
  field: SortField,
  direction: SortDirection,
): SalaryRecord[] {
  const sorted = [...records];

  sorted.sort((a, b) => {
    let cmp = 0;

    switch (field) {
      case "company":
        cmp = compareStrings(
          a.company,
          b.company,
          direction,
        );
        break;
      case "role":
        cmp = compareStrings(
          a.role,
          b.role,
          direction,
        );
        break;
      case "level_standardized":
        cmp = compareStrings(
          a.level_standardized,
          b.level_standardized,
          direction,
        );
        break;
      case "location":
        cmp = compareStrings(
          a.location,
          b.location,
          direction,
        );
        break;
      case "experience_years":
        cmp =
          (a.experience_years - b.experience_years) *
          (direction === "asc" ? 1 : -1);
        break;
      default:
        cmp =
          ((a[field] as number) -
            (b[field] as number)) *
          (direction === "asc" ? 1 : -1);
    }

    return cmp;
  });

  return sorted;
}

export function paginateSalaries<T>(
  records: T[],
  page: number,
  pageSize = PAGE_SIZE,
): {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
  from: number;
  to: number;
} {
  const total = records.length;
  const totalPages = Math.max(
    1,
    Math.ceil(total / pageSize),
  );
  const safePage = Math.min(
    Math.max(1, page),
    totalPages,
  );
  const start = (safePage - 1) * pageSize;
  const data = records.slice(
    start,
    start + pageSize,
  );

  return {
    data,
    total,
    page: safePage,
    totalPages,
    from: total === 0 ? 0 : start + 1,
    to: start + data.length,
  };
}

export function processSalaryQuery(
  records: SalaryRecord[],
  params: SalarySearchParams,
) {
  const { field, direction } = parseSort(
    params.sort,
  );
  const filtered = filterSalaries(
    records,
    params,
  );
  const sorted = sortSalaries(
    filtered,
    field,
    direction,
  );
  const page = Math.max(
    1,
    parseInt(params.page ?? "1", 10) || 1,
  );
  const paginated = paginateSalaries(
    sorted,
    page,
  );

  return {
    ...paginated,
    sortField: field,
    sortDirection: direction,
  };
}

export function uniqueValues(
  records: SalaryRecord[],
  key: "role" | "location",
): string[] {
  return [
    ...new Set(records.map((r) => r[key])),
  ].sort((a, b) => a.localeCompare(b));
}
