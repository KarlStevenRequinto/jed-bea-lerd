revoke delete on table "public"."listings" from "anon";

revoke insert on table "public"."listings" from "anon";

revoke references on table "public"."listings" from "anon";

revoke select on table "public"."listings" from "anon";

revoke trigger on table "public"."listings" from "anon";

revoke truncate on table "public"."listings" from "anon";

revoke update on table "public"."listings" from "anon";

revoke delete on table "public"."listings" from "authenticated";

revoke insert on table "public"."listings" from "authenticated";

revoke references on table "public"."listings" from "authenticated";

revoke select on table "public"."listings" from "authenticated";

revoke trigger on table "public"."listings" from "authenticated";

revoke truncate on table "public"."listings" from "authenticated";

revoke update on table "public"."listings" from "authenticated";

revoke delete on table "public"."listings" from "service_role";

revoke insert on table "public"."listings" from "service_role";

revoke references on table "public"."listings" from "service_role";

revoke select on table "public"."listings" from "service_role";

revoke trigger on table "public"."listings" from "service_role";

revoke truncate on table "public"."listings" from "service_role";

revoke update on table "public"."listings" from "service_role";

revoke delete on table "public"."profiles" from "anon";

revoke insert on table "public"."profiles" from "anon";

revoke references on table "public"."profiles" from "anon";

revoke select on table "public"."profiles" from "anon";

revoke trigger on table "public"."profiles" from "anon";

revoke truncate on table "public"."profiles" from "anon";

revoke update on table "public"."profiles" from "anon";

revoke delete on table "public"."profiles" from "authenticated";

revoke insert on table "public"."profiles" from "authenticated";

revoke references on table "public"."profiles" from "authenticated";

revoke select on table "public"."profiles" from "authenticated";

revoke trigger on table "public"."profiles" from "authenticated";

revoke truncate on table "public"."profiles" from "authenticated";

revoke update on table "public"."profiles" from "authenticated";

revoke delete on table "public"."profiles" from "service_role";

revoke insert on table "public"."profiles" from "service_role";

revoke references on table "public"."profiles" from "service_role";

revoke select on table "public"."profiles" from "service_role";

revoke trigger on table "public"."profiles" from "service_role";

revoke truncate on table "public"."profiles" from "service_role";

revoke update on table "public"."profiles" from "service_role";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.sync_profile_email()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  UPDATE public.profiles
  SET email = NEW.email
  WHERE id = NEW.id;
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
  BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
  END;
  $function$
;


