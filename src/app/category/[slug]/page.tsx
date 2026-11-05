
import { ICategory, IProduct } from "@/types/type";
import { notFound, redirect } from "next/navigation";
import CategoryProducts from "@/components/CategoryProducts";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const CategoryDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/signin");
  }

  const { slug } = await params;

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    throw new Error("API URL is not configured");
  }

  let products: IProduct[] = [];
  let category: ICategory;

  let productsRes: Response;
  let categoryRes: Response;

  try {
    const results = await Promise.all([
      fetch(
        `${baseUrl}/products?category=${encodeURIComponent(slug)}`,
        { cache: "no-store" }
      ),
      fetch(
        `${baseUrl}/categories/${encodeURIComponent(slug)}`,
        { cache: "no-store" }
      ),
    ]);

    productsRes = results[0];
    categoryRes = results[1];
  } catch (error) {
    console.error("Category fetch error:", error);
    throw error;
  }

  if (!categoryRes.ok) {
    notFound();
  }

  if (!productsRes.ok) {
    throw new Error("Failed to fetch category products");
  }

  products = await productsRes.json();
  category = await categoryRes.json();

  return (
    <main className="min-h-screen w-full bg-[#f0f5f1] py-5 sm:py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-4">

        <div className="bg-[#fbfdfb] rounded-xl border border-[#e2eae3] px-4 py-3 flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-[#f1f7f2] flex items-center justify-center text-2xl shrink-0">
            {category.icon}
          </div>

          <div className="min-w-0">
            <h1 className="text-base sm:text-lg font-bold text-[#26332b]">
              {category.nameBn}
            </h1>

            <p className="text-[11px] text-gray-500 mt-0.5">
              {products.length.toLocaleString("bn-BD")}টি পণ্যের আজকের বাজার দর ও পরিবর্তন
            </p>
          </div>

        </div>

        <CategoryProducts products={products} />

      </div>
    </main>
  );
};

export default CategoryDetailsPage;
