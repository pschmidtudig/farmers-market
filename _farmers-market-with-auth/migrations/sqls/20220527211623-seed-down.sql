/* Replace with your SQL commands */
comment on constraint vendor_product_vendor_fkey on public."vendor_product" is null;
comment on constraint vendor_location_vendor_fkey on public."vendor_location" is null;
comment on constraint vendor_location_location_fkey on public."vendor_location" is null;
comment on constraint vendor_product_product_fkey on public."vendor_product" is null;
DROP TABLE public.vendor_product;
DROP TABLE public.vendor_location;
DROP TABLE public.product;
DROP TABLE public.product_type;
DROP TABLE public.location;
DROP TABLE public.vendor;